"use client";

import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import {
  ArrowLeft,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  EyeOff,
} from "lucide-react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  Environment,
  Float,
} from "@react-three/drei";
import {
  useState,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  use,
  useCallback,
} from "react";
import * as THREE from "three";
import { SkeletonUtils, GLTF } from "three-stdlib";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// ============================================================
// INTERIOR LIGHT (two soft point lights, active only when abutment hidden)
// ============================================================
type InteriorLightProps = {
  hideAbutment: boolean;
  hideCrown: boolean;
};

function CrownInteriorLight({ hideAbutment, hideCrown }: InteriorLightProps) {
  const active = hideAbutment && !hideCrown;

  if (!active) return null;

  return (
    <>
      <pointLight
        position={[-0.55, 0.15, 0.15]}
        intensity={0.6}
        distance={0.8}
        decay={2}
        color="#fff8ee"
      />
      <pointLight
        position={[0.55, 0.15, 0.15]}
        intensity={0.6}
        distance={0.8}
        decay={2}
        color="#fff8ee"
      />
    </>
  );
}

// ============================================================
// Helper to safely dispose materials (single or array)
// ============================================================
function disposeMaterial(mat: THREE.Material | THREE.Material[] | undefined) {
  if (!mat) return;
  if (Array.isArray(mat)) {
    mat.forEach((m) => m.dispose());
  } else {
    mat.dispose();
  }
}

// ============================================================
// MODEL COMPONENT – NO INNER SHELL (removed white section)
// ============================================================
type ModelProps = {
  url: string;
  crownType: string;
  abutmentType: string;
  hideCrown: boolean;
  hideAbutment: boolean;
  isMonolith?: boolean; // added to distinguish Monolith mode
  onLoaded?: () => void;
};

function Model({
  url,
  crownType,
  abutmentType,
  hideCrown,
  hideAbutment,
  isMonolith = false,
  onLoaded,
}: ModelProps) {
  const { scene } = useGLTF(url) as GLTF;
  const { gl } = useThree();

  const crownMeshesRef = useRef<THREE.Mesh[]>([]);
  const abutmentMeshesRef = useRef<THREE.Mesh[]>([]);
  const originalCrownMaterialsRef = useRef<Map<THREE.Mesh, THREE.Material>>(
    new Map()
  );
  const originalAbutmentMaterialsRef = useRef<Map<THREE.Mesh, THREE.Material>>(
    new Map()
  );
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  const neutralEnvMap = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const env = pmrem.fromScene(new RoomEnvironment()).texture;
    pmrem.dispose();
    return env;
  }, [gl]);

  // Crown material factory: only override for PFM and LISI; Zirconia keeps original.
  // In Monolith mode, PFM also keeps original (to look like Zirconia).
  const createCrownMaterial = useCallback((type: string) => {
    switch (type) {
      case "LISI":
        return new THREE.MeshPhysicalMaterial({
          color: "#efe2cf",
          roughness: 0.28,
          transmission: 0.12,
          thickness: 1,
          clearcoat: 0.45,
          clearcoatRoughness: 0.2,
          ior: 1.5,
        });
      default:
        return null;
    }
  }, []);

  // Abutment material: clone original + override color/metalness/roughness
  const createAbutmentMaterialOverride = useCallback(
    (originalMat: THREE.Material, type: string) => {
      const mat = originalMat.clone() as THREE.MeshStandardMaterial;
      switch (type) {
        case "Titanium":
          mat.color.set("#ffffff");
          mat.metalness = 1;
          mat.roughness = 0.1;
          break;
        case "Zirconia":
          mat.color.set("#ffffff");
          mat.metalness = 0;
          mat.roughness = 0.1;
          mat.envMap = neutralEnvMap;
          mat.envMapIntensity = 0.9;
          break;
        case "Anodised":
          mat.color.set("#d7c37d");
          mat.metalness = 1;
          mat.roughness = 0.1;
          break;
        default:
          return null;
      }
      return mat;
    },
    [neutralEnvMap]
  );

  const applyMaterialToMesh = useCallback(
    (mesh: THREE.Mesh, newMaterial: THREE.Material) => {
      const oldMaterial = mesh.material;
      mesh.material = newMaterial;
      mesh.material.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
      disposeMaterial(oldMaterial);
    },
    []
  );

  // Clone and collect meshes
  useEffect(() => {
    if (!scene) return;

    const clone = SkeletonUtils.clone(scene);
    crownMeshesRef.current = [];
    abutmentMeshesRef.current = [];
    originalCrownMaterialsRef.current.clear();
    originalAbutmentMaterialsRef.current.clear();

    clone.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      const name = node.name.toLowerCase();

      // Hide helpers
      if (
        name.includes("plane") ||
        name.includes("base") ||
        name.includes("ground")
      ) {
        node.visible = false;
        return;
      }

      node.castShadow = true;
      node.receiveShadow = true;

      // Crown detection (supports both "crown" and "crown_outer/inner")
      if (name.includes("crown")) {
        crownMeshesRef.current.push(node);
        originalCrownMaterialsRef.current.set(
          node,
          Array.isArray(node.material) ? node.material[0].clone() : node.material.clone()
        );
      }

      // Abutment detection
      if (name.includes("abutment") || name.includes("titanium")) {
        abutmentMeshesRef.current.push(node);
        originalAbutmentMaterialsRef.current.set(
          node,
          Array.isArray(node.material) ? node.material[0].clone() : node.material.clone()
        );
      }
    });

    // Center & scale
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const scaleVal = 4 / Math.max(size.x, size.y, size.z);
    clone.position.set(
      -center.x * scaleVal,
      -center.y * scaleVal,
      -center.z * scaleVal
    );
    clone.scale.set(scaleVal, scaleVal, scaleVal);

    setModel(clone);
    onLoaded?.();
  }, [scene, url, onLoaded]);

  // Update crown materials – NO INNER SHELL
  // For Monolith mode, PFM is treated like Zirconia (use original material)
  useEffect(() => {
    for (const mesh of crownMeshesRef.current) {
      let newMat: THREE.Material | null = null;
      let shouldOverride = false;

      if (isMonolith && crownType === "PFM") {
        // In Monolith, PFM looks like Zirconia – use original material
        shouldOverride = false;
      } else {
        // Normal behavior: PFM and LISI override, Zirconia original
        if (crownType === "PFM") {
          newMat = new THREE.MeshStandardMaterial({
            color: "#d7d7d7",
            metalness: 0.72,
            roughness: 0.24,
          });
          shouldOverride = true;
        } else if (crownType === "LISI") {
          newMat = createCrownMaterial(crownType);
          shouldOverride = true;
        }
      }

      if (!shouldOverride) {
        const orig = originalCrownMaterialsRef.current.get(mesh);
        if (orig) newMat = orig.clone();
      }

      if (newMat) applyMaterialToMesh(mesh, newMat);

      mesh.visible = !hideCrown;
      mesh.renderOrder = 10;
    }
  }, [crownType, hideCrown, isMonolith, createCrownMaterial, applyMaterialToMesh]);

  // Update abutment materials (ALL meshes, including upper part)
  useEffect(() => {
    for (const mesh of abutmentMeshesRef.current) {
      const originalMat = originalAbutmentMaterialsRef.current.get(mesh);
      if (!originalMat) continue;

      let newMat: THREE.Material | null = null;
      if (abutmentType === "Anodised") {
        newMat = createAbutmentMaterialOverride(originalMat, abutmentType);
      } else if (abutmentType === "Titanium" || abutmentType === "Zirconia") {
        newMat = createAbutmentMaterialOverride(originalMat, abutmentType);
      }
      if (newMat) applyMaterialToMesh(mesh, newMat);
      mesh.visible = !hideAbutment;
      mesh.renderOrder = 20;
    }
  }, [abutmentType, hideAbutment, createAbutmentMaterialOverride, applyMaterialToMesh]);

  return model ? <primitive object={model} /> : null;
}

// Preload models – using correct names: fixed.glb (monolith) and cutback.glb
useGLTF.preload("/3d-model/fixed.glb");
useGLTF.preload("/3d-model/cutback.glb");

// ============================================================
// PRODUCT DATA (unchanged from original layout)
// ============================================================
const productData: { [key: string]: any } = {
  "anterior-crown-screw": {
    name: "Anterior Crown",
    category: "Screw retained",
    fullName: "Anterior Screw-Retained Implant Crown",
    description: `A digitally designed anterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained "screwmentable" design provides the aesthetic benefits of a cemented crown with the retrievability and clinical control of a screw-retained solution.`,
    material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  \nCustom Titanium Abutment — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
    benefits: [
      "Screw-retained design for full clinical retrievability",
      "Gold-anodised titanium abutment for warm soft-tissue aesthetics",
      "Optimised emergence profile for stable peri-implant tissue support",
      "Fusion-Zirconia crown for natural translucency and long-term strength",
      "Excellent marginal accuracy through CAD/CAM design",
      "Reduced risk of residual cement complications",
      "Biocompatible, stable and fully traceable",
    ],
    aesthetic: {
      title: "Enhanced Aesthetic Version",
      description: "For high-visibility anterior implant cases, we offer a cut-back Fusion-Zirconia crown bonded to the custom abutment, finished with a micro-layered feldspathic-enriched ceramic on the labial surface. This option enhances optical depth, translucency and natural characterisation while maintaining the strength of the zirconia core.",
      whyChooseTitle: "Why Choose the Cut-Back Option",
      benefits: [
        "Increased vitality and enamel-like light refraction",
        "More natural surface texture and internal character",
        "Superior blending with adjacent natural teeth",
        "Ideal for single centrals and aesthetic-critical implant sites",
        "Maintains zirconia strength while elevating ceramic beauty",
      ],
      conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth, making it the preferred choice for demanding aesthetic implant restorations.",
    },
  },
  "posterior-crown-screw": {
    name: "Posterior Crown",
    category: "Screw retained",
    fullName: "Posterior Screw-Retained Implant Crown",
    description: `A digitally designed posterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained "screwmentable" design provides the aesthetic benefits of a cemented crown with the retrievability and clinical control of a screw-retained solution.`,
    material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  \nCustom Titanium Abutment — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
    benefits: [
      "Screw-retained design for full clinical retrievability",
      "Gold-anodised titanium abutment for warm soft-tissue aesthetics",
      "Optimised emergence profile for stable peri-implant tissue support",
      "Fusion-Zirconia crown for natural translucency and long-term strength",
      "Excellent marginal accuracy through CAD/CAM design",
      "Reduced risk of residual cement complications",
      "Biocompatible, stable and fully traceable",
    ],
    aesthetic: {
      title: "Enhanced Aesthetic Version",
      description: "For high-visibility posterior implant cases, we offer a cut-back Fusion-Zirconia crown bonded to the custom abutment, finished with a micro-layered feldspathic-enriched ceramic on the visible surfaces. This option enhances optical depth, translucency and natural characterisation while maintaining the strength of the zirconia core.",
      whyChooseTitle: "Why Choose the Cut-Back Option",
      benefits: [
        "Increased vitality and enamel-like light refraction",
        "More natural surface texture and internal character",
        "Superior blending with adjacent natural teeth",
        "Ideal for aesthetic-critical posterior sites",
        "Maintains zirconia strength while elevating ceramic beauty",
      ],
      conclusion: "This option replicates the subtle optical behaviour of natural teeth, making it the preferred choice for demanding aesthetic restorations.",
    },
  },
  "anterior-3-unit-bridge-screw": {
    name: "Anterior 3 Unit Bridge",
    category: "Screw retained",
    fullName: "Anterior Screw-Retained 3 Unit Bridge",
    description: `A digitally designed anterior 3-unit implant bridge combining our exclusive Fusion-Zirconia bridge with precision-milled CAD/CAM titanium custom abutments. The abutments are laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained "screwmentable" design provides the aesthetic benefits of a cemented bridge with the retrievability and clinical control of a screw-retained solution.`,
    material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  \nCustom Titanium Abutments — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
    benefits: [
      "Screw-retained design for full clinical retrievability",
      "Gold-anodised titanium abutments for warm soft-tissue aesthetics",
      "Optimised emergence profile for stable peri-implant tissue support",
      "Fusion-Zirconia bridge for natural translucency and long-term strength",
      "Excellent marginal accuracy through CAD/CAM design",
      "Reduced risk of residual cement complications",
      "Biocompatible, stable and fully traceable",
    ],
    aesthetic: {
      title: "Enhanced Aesthetic Version",
      description: "For high-visibility anterior implant cases, we offer a cut-back Fusion-Zirconia bridge bonded to the custom abutments, finished with micro-layered feldspathic-enriched ceramic on the labial surfaces. This option enhances optical depth, translucency and natural characterisation while maintaining the strength of the zirconia core.",
      whyChooseTitle: "Why Choose the Cut-Back Option",
      benefits: [
        "Increased vitality and enamel-like light refraction",
        "More natural surface texture and internal character",
        "Superior blending with adjacent natural teeth",
        "Ideal for single centrals and aesthetic-critical implant sites",
        "Maintains zirconia strength while elevating ceramic beauty",
      ],
      conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth, making it the preferred choice for demanding aesthetic implant restorations.",
    },
  },
  "posterior-3-unit-bridge-screw": {
    name: "Posterior 3 Unit Bridge",
    category: "Screw retained",
    fullName: "Posterior Screw-Retained 3 Unit Bridge",
    description: `A digitally designed posterior 3-unit implant bridge combining our exclusive Fusion-Zirconia bridge with precision-milled CAD/CAM titanium custom abutments. The abutments are laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained "screwmentable" design provides the aesthetic benefits of a cemented bridge with the retrievability and clinical control of a screw-retained solution.`,
    material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  \nCustom Titanium Abutments — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
    benefits: [
      "Screw-retained design for full clinical retrievability",
      "Gold-anodised titanium abutments for warm soft-tissue aesthetics",
      "Optimised emergence profile for stable peri-implant tissue support",
      "Fusion-Zirconia bridge for natural translucency and long-term strength",
      "Excellent marginal accuracy through CAD/CAM design",
      "Reduced risk of residual cement complications",
      "Biocompatible, stable and fully traceable",
    ],
    aesthetic: {
      title: "Enhanced Aesthetic Version",
      description: "For high-visibility anterior implant cases, we offer a cut-back Fusion-Zirconia bridge bonded to the custom abutments, finished with micro-layered feldspathic-enriched ceramic on the labial surfaces. This option enhances optical depth, translucency and natural characterisation while maintaining the strength of the zirconia core.",
      whyChooseTitle: "Why Choose the Cut-Back Option",
      benefits: [
        "Increased vitality and enamel-like light refraction",
        "More natural surface texture and internal character",
        "Superior blending with adjacent natural teeth",
        "Ideal for single centrals and aesthetic-critical implant sites",
        "Maintains zirconia strength while elevating ceramic beauty",
      ],
      conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth, making it the preferred choice for demanding aesthetic implant restorations.",
    },
  },
  "anterior-crown-cement": {
    name: "Anterior Crown",
    category: "Cement retained",
    fullName: "Anterior Cement-Retained Implant Crown",
    description: `A digitally designed anterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is designed for cement retention, providing excellent marginal fit and aesthetic outcomes.`,
    material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  \nCustom Titanium Abutment — CAD/CAM-milled Grade 5 titanium for optimal fit and biocompatibility.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
    benefits: [
      "Cement-retained design for passive fit",
      "Excellent marginal accuracy through CAD/CAM design",
      "Fusion-Zirconia crown for natural translucency and long-term strength",
      "Custom abutment for optimal emergence profile",
      "Ideal for limited interarch space cases",
      "Predictable aesthetic outcomes",
      "Biocompatible, stable and fully traceable",
    ],
    aesthetic: {
      title: "Enhanced Aesthetic Version",
      description: "For high-visibility anterior implant cases, we offer a cut-back Fusion-Zirconia crown bonded to the custom abutment, finished with a micro-layered feldspathic-enriched ceramic on the labial surface.",
      whyChooseTitle: "Why Choose the Cut-Back Option",
      benefits: [
        "Increased vitality and enamel-like light refraction",
        "More natural surface texture and internal character",
        "Superior blending with adjacent natural teeth",
        "Ideal for single centrals and aesthetic-critical implant sites",
        "Maintains zirconia strength while elevating ceramic beauty",
      ],
      conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth.",
    },
  },
  "posterior-crown-cement": {
    name: "Posterior Crown",
    category: "Cement retained",
    fullName: "Posterior Cement-Retained Implant Crown",
    description: `A digitally designed posterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is designed for cement retention, providing excellent marginal fit and durability.`,
    material: `Fusion-Zirconia — a multilayer zirconia with high flexural strength.  \nCustom Titanium Abutment — CAD/CAM-milled Grade 5 titanium.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
    benefits: [
      "Cement-retained design for passive fit",
      "Excellent marginal accuracy",
      "Fusion-Zirconia crown for long-term strength",
      "Custom abutment for optimal fit",
      "Biocompatible and fully traceable",
    ],
    aesthetic: {
      title: "Enhanced Aesthetic Version",
      description: "For aesthetic-critical posterior cases, we offer enhanced ceramic layering on visible surfaces.",
      whyChooseTitle: "Why Choose the Enhanced Option",
      benefits: [
        "More natural surface texture",
        "Superior blending with adjacent teeth",
        "Maintains core strength",
      ],
      conclusion: "Ideal for demanding aesthetic requirements.",
    },
  },
  "anterior-3-unit-bridge-cement": {
    name: "Anterior 3 Unit Bridge",
    category: "Cement retained",
    fullName: "Anterior Cement-Retained 3 Unit Bridge",
    description: `A digitally designed anterior 3-unit implant bridge combining our exclusive Fusion-Zirconia bridge with precision-milled CAD/CAM titanium custom abutments. Designed for cement retention with optimal aesthetics.`,
    material: `Fusion-Zirconia bridge with custom titanium abutments. Both components are fully CE- and UKCA-marked.`,
    benefits: [
      "Cement-retained design",
      "Excellent marginal accuracy",
      "Fusion-Zirconia for natural aesthetics",
      "Custom abutments for optimal fit",
      "Biocompatible and traceable",
    ],
    aesthetic: {
      title: "Enhanced Aesthetic Version",
      description: "Enhanced ceramic layering for anterior aesthetics.",
      whyChooseTitle: "Why Choose the Enhanced Option",
      benefits: [
        "Increased vitality",
        "Natural surface texture",
        "Superior blending",
      ],
      conclusion: "Ideal for demanding aesthetic cases.",
    },
  },
  "posterior-3-unit-bridge-cement": {
    name: "Posterior 3 Unit Bridge",
    category: "Cement retained",
    fullName: "Posterior Cement-Retained 3 Unit Bridge",
    description: `A digitally designed posterior 3-unit implant bridge combining our exclusive Fusion-Zirconia bridge with precision-milled CAD/CAM titanium custom abutments. Designed for cement retention with optimal strength.`,
    material: `Fusion-Zirconia bridge with custom titanium abutments. Fully CE- and UKCA-marked.`,
    benefits: [
      "Cement-retained design",
      "Excellent marginal accuracy",
      "High-strength Fusion-Zirconia",
      "Custom abutments",
      "Biocompatible",
    ],
    aesthetic: {
      title: "Enhanced Aesthetic Version",
      description: "Enhanced ceramic layering for visible surfaces.",
      whyChooseTitle: "Why Choose the Enhanced Option",
      benefits: [
        "Natural surface texture",
        "Superior blending",
      ],
      conclusion: "Ideal for aesthetic requirements.",
    },
  },
};

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = productData[slug];

  const [open, setOpen] = useState<string | null>(null);
  const toggle = (section: string) => setOpen(open === section ? null : section);

  const [modelMode, setModelMode] = useState<"cutback" | "fixed">("cutback");
  const [cutbackState, setCutbackState] = useState({
    crown: "Zirconia",
    abutment: "Titanium",
    hideCrown: false,
    hideAbutment: false,
  });
  const [fixedState, setFixedState] = useState({
    crown: "Zirconia",
    abutment: "Titanium",
    hideCrown: false,
    hideAbutment: false,
  });

  const currentState = modelMode === "cutback" ? cutbackState : fixedState;
  const updateCurrentState = useCallback(
    (updates: Partial<typeof currentState>) => {
      if (modelMode === "cutback") {
        setCutbackState((prev) => ({ ...prev, ...updates }));
      } else {
        setFixedState((prev) => ({ ...prev, ...updates }));
      }
    },
    [modelMode]
  );

  const [isClient, setIsClient] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const controlsRef = useRef<any>(null);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    setModelLoading(true);
    setModelError(false);
    if (modelMode === "cutback" && currentState.crown === "PFM") {
      updateCurrentState({ crown: "Zirconia" });
    }
  }, [modelMode, updateCurrentState]);

  const handleZoom = (direction: "in" | "out") => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const camera = controls.object;
    const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
    if (direction === "in") dir.multiplyScalar(0.75);
    else dir.multiplyScalar(1.25);
    if (dir.length() < 2) dir.setLength(2);
    if (dir.length() > 10) dir.setLength(10);
    camera.position.copy(controls.target).add(dir);
    controls.update();
  };

  const handleReset = () => {
    if (!controlsRef.current) return;
    controlsRef.current.object.position.set(5, 3, 5);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  const handleModelLoaded = useCallback(() => {
    setModelLoading(false);
  }, []);

  const isFixedPFM = modelMode === "fixed" && currentState.crown === "PFM";
  const showPFM = modelMode !== "cutback";

  useEffect(() => {
    if (isFixedPFM && currentState.hideAbutment)
      updateCurrentState({ hideAbutment: false });
  }, [isFixedPFM, currentState.hideAbutment, updateCurrentState]);

  if (!product)
    return <div className="p-20 text-center text-gray-500">Product not found</div>;

  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />

      <section className="pt-40 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <Link
          href="/services/implants"
          className="inline-flex items-center text-gray-500 mb-10 hover:text-[#7ab88a] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Implants
        </Link>

        <div className="lg:hidden mb-8">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-[#7ab88a] bg-[#a2d8b2]/20 px-3 py-1 mb-3">
            {product.category}
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {product.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* LEFT COLUMN – 3D Viewer + Controls */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-gray-50 to-[#a2d8b2]/20 h-[550px] border border-[#a2d8b2]/30 overflow-hidden relative shadow-sm group">
              {isClient && !modelError && modelLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-20">
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#a2d8b2]"></div>
                    <p className="text-gray-500 font-medium tracking-wide">
                      Loading 3D model...
                    </p>
                  </div>
                </div>
              )}

              {isClient && !modelError && (
                <Canvas
                  gl={{
                    toneMappingExposure: 1.2,
                    toneMapping: THREE.ACESFilmicToneMapping,
                  }}
                  camera={{ position: [5, 3, 5], fov: 40 }}
                  onError={() => setModelError(true)}
                >
                  <color attach="background" args={["#616161"]} />

                  <Suspense fallback={null}>
                    <Environment
                      files="/3d-model/Industrial_Room.exr"
                      background={false}
                      environmentIntensity={1.3}
                    />
                    {/* Lighting setup (as in original layout) */}
                    <directionalLight
                      position={[-5, 8, 3]}
                      intensity={2}
                      color="#fff5e8"
                      castShadow
                    />
                    <directionalLight position={[4, 5, 3]} intensity={1} color="#ffeedd" />
                    <pointLight
                      position={[5, 4.5, 2.2]}
                      intensity={3.5}
                      color="#ffe6b3"
                      distance={5}
                      decay={2}
                    />
                    <directionalLight position={[1, 2, -4]} intensity={1} color="#ffffff" />
                    <ambientLight intensity={0.4} />

                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                      <Center>
                        <Model
                          key={modelMode}
                          url={`/3d-model/${modelMode === "cutback" ? "cutback" : "fixed"}.glb`}
                          crownType={currentState.crown}
                          abutmentType={
                            isFixedPFM ? "Titanium" : currentState.abutment
                          }
                          hideCrown={currentState.hideCrown}
                          hideAbutment={currentState.hideAbutment}
                          isMonolith={modelMode === "fixed"}
                          onLoaded={handleModelLoaded}
                        />
                      </Center>
                    </Float>

                    <CrownInteriorLight
                      hideAbutment={currentState.hideAbutment}
                      hideCrown={currentState.hideCrown}
                    />
                  </Suspense>

                  <OrbitControls
                    ref={controlsRef}
                    enableZoom
                    enablePan
                    enableRotate
                    minDistance={2}
                    maxDistance={10}
                    autoRotate
                    autoRotateSpeed={1.0}
                  />
                </Canvas>
              )}

              {isClient && !modelError && (
                <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleZoom("in")}
                    className="bg-white/80 backdrop-blur-md p-3 shadow-lg border border-gray-100 hover:bg-[#a2d8b2] transition-all text-gray-600 hover:-translate-y-1"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleZoom("out")}
                    className="bg-white/80 backdrop-blur-md p-3 shadow-lg border border-gray-100 hover:bg-[#a2d8b2] transition-all text-gray-600 hover:-translate-y-1"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-white/80 backdrop-blur-md p-3 shadow-lg border border-gray-100 hover:bg-gray-100 transition-all text-gray-600 mt-2 hover:-translate-y-1"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              )}

              {isClient && modelError && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-red-400 mb-3">Unable to load 3D model</p>
                    <button
                      onClick={() => {
                        setModelError(false);
                        setModelLoading(true);
                      }}
                      className="px-6 py-2 bg-[#a2d8b2] text-gray-900 font-medium hover:bg-[#8ec29e]"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
              {!isClient && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin h-10 w-10 border-b-2 border-[#a2d8b2] mx-auto mb-4"></div>
                  <p className="text-gray-500 font-medium tracking-wide">
                    Initializing 3D viewer...
                  </p>
                </div>
              )}
            </div>

            {/* SINGLE CONTROL BOX (same as original layout) */}
            <div className="bg-gray-50/50 p-6 border border-[#a2d8b2]/20 space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 ml-1">
                  Restoration Type
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setModelMode("cutback")}
                    className={`px-6 py-3 border transition-all duration-300 font-medium ${
                      modelMode === "cutback"
                        ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"
                    }`}
                  >
                    Cutback
                  </button>
                  <button
                    onClick={() => setModelMode("fixed")}
                    className={`px-6 py-3 border transition-all duration-300 font-medium ${
                      modelMode === "fixed"
                        ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"
                    }`}
                  >
                    Monolith
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 ml-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                    Crown Material
                  </h3>
                  <button
                    onClick={() =>
                      updateCurrentState({ hideCrown: !currentState.hideCrown })
                    }
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    {currentState.hideCrown ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => updateCurrentState({ crown: "Zirconia" })}
                    className={`px-4 py-2.5 border transition-all duration-300 font-medium ${
                      currentState.crown === "Zirconia"
                        ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"
                    }`}
                  >
                    Zirconia
                  </button>
                  {showPFM && (
                    <button
                      onClick={() => updateCurrentState({ crown: "PFM" })}
                      className={`px-4 py-2.5 border transition-all duration-300 font-medium ${
                        currentState.crown === "PFM"
                          ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"
                      }`}
                    >
                      PFM
                    </button>
                  )}
                </div>
              </div>

              {!isFixedPFM && (
                <div>
                  <div className="flex items-center gap-2 mb-3 ml-1">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                      Abutment Material
                    </h3>
                    <button
                      onClick={() =>
                        updateCurrentState({
                          hideAbutment: !currentState.hideAbutment,
                        })
                      }
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      {currentState.hideAbutment ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["Titanium", "Zirconia", "Anodised"].map((item) => (
                      <button
                        key={item}
                        onClick={() => updateCurrentState({ abutment: item })}
                        className={`px-4 py-2.5 border transition-all duration-300 font-medium ${
                          currentState.abutment === item
                            ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md"
                            : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN – Accordion sections (unchanged from original layout) */}
          <div className="space-y-6">
            <div className="hidden lg:block">
              <span className="text-sm font-bold uppercase tracking-widest text-[#7ab88a] bg-[#a2d8b2]/20 px-3 py-1">
                {product.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mt-5 leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>
            <div className="prose prose-lg max-w-none pb-2">
              <p className="text-gray-600 leading-relaxed font-light text-[1.05rem]">
                {product.description}
              </p>
            </div>
            <div className="space-y-3">
              {/* Material Specifications */}
              <div
                className={`border overflow-hidden transition-all duration-300 ${
                  open === "mat"
                    ? "border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/20"
                    : "border-gray-100 shadow-sm hover:border-[#a2d8b2]/50"
                }`}
              >
                <button
                  onClick={() => toggle("mat")}
                  className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${
                    open === "mat" ? "bg-[#a2d8b2]/10" : "bg-white hover:bg-[#a2d8b2]/5"
                  }`}
                >
                  <span
                    className={`text-lg font-bold transition-colors ${
                      open === "mat" ? "text-gray-900" : "text-gray-800"
                    }`}
                  >
                    Material Specifications
                  </span>
                  <div
                    className={`p-1.5 transition-all duration-300 ${
                      open === "mat"
                        ? "bg-[#a2d8b2] text-gray-900 rotate-180"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    open === "mat"
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden bg-white">
                    <div className="p-4 pt-2 text-sm text-gray-600 border-t border-[#a2d8b2]/20">
                      <p className="whitespace-pre-line leading-relaxed">
                        {product.material}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinical Benefits */}
              <div
                className={`border overflow-hidden transition-all duration-300 ${
                  open === "ben"
                    ? "border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/20"
                    : "border-gray-100 shadow-sm hover:border-[#a2d8b2]/50"
                }`}
              >
                <button
                  onClick={() => toggle("ben")}
                  className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${
                    open === "ben" ? "bg-[#a2d8b2]/10" : "bg-white hover:bg-[#a2d8b2]/5"
                  }`}
                >
                  <span
                    className={`text-lg font-bold transition-colors ${
                      open === "ben" ? "text-gray-900" : "text-gray-800"
                    }`}
                  >
                    Clinical Benefits
                  </span>
                  <div
                    className={`p-1.5 transition-all duration-300 ${
                      open === "ben"
                        ? "bg-[#a2d8b2] text-gray-900 rotate-180"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    open === "ben"
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden bg-white">
                    <div className="p-4 pt-3 border-t border-[#a2d8b2]/20">
                      <ul className="space-y-3">
                        {product.benefits.map((b: string, i: number) => (
                          <li
                            key={i}
                            className="flex gap-3 items-start text-sm text-gray-600"
                          >
                            <span className="w-1.5 h-1.5 bg-[#a2d8b2] mt-1.5 flex-shrink-0 shadow-sm"></span>
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aesthetic Option */}
              {product.aesthetic && (
                <div
                  className={`border overflow-hidden transition-all duration-300 ${
                    open === "aes"
                      ? "border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/20"
                      : "border-gray-100 shadow-sm hover:border-[#a2d8b2]/50"
                  }`}
                >
                  <button
                    onClick={() => toggle("aes")}
                    className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${
                      open === "aes"
                        ? "bg-[#a2d8b2]/10"
                        : "bg-white hover:bg-[#a2d8b2]/5"
                    }`}
                  >
                    <span
                      className={`text-lg font-bold transition-colors ${
                        open === "aes" ? "text-gray-900" : "text-gray-800"
                      }`}
                    >
                      Cut-Back Aesthetic Option
                    </span>
                    <div
                      className={`p-1.5 transition-all duration-300 ${
                        open === "aes"
                          ? "bg-[#a2d8b2] text-gray-900 rotate-180"
                          : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      open === "aes"
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden bg-white">
                      <div className="p-4 pt-3 border-t border-[#a2d8b2]/20 space-y-4 text-sm">
                        <p className="font-bold text-gray-900">
                          {product.aesthetic.title}
                        </p>
                        <p className="text-gray-600 leading-relaxed bg-[#a2d8b2]/10 p-3 border border-[#a2d8b2]/20">
                          {product.aesthetic.description}
                        </p>
                        <p className="font-bold text-gray-900 pt-1">
                          {product.aesthetic.whyChooseTitle}
                        </p>
                        <ul className="space-y-2.5">
                          {product.aesthetic.benefits.map((b: string, i: number) => (
                            <li key={i} className="flex gap-3 items-start text-gray-600">
                              <span className="w-1.5 h-1.5 bg-[#a2d8b2] mt-1.5 flex-shrink-0 shadow-sm"></span>
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-gray-600 leading-relaxed italic border-l-4 border-[#a2d8b2] pl-3 mt-3 py-1">
                          {product.aesthetic.conclusion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
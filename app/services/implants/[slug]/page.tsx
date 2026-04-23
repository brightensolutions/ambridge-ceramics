"use client";

import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  Environment,
  ContactShadows,
  Float,
} from "@react-three/drei";
import { useState, Suspense, useEffect, useMemo, useRef, use } from "react";
import * as THREE from "three";
import { SkeletonUtils, GLTF } from "three-stdlib";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// ============================================================
// MODEL COMPONENT (unchanged)
// ============================================================
type ModelProps = {
  url: string;
  crownType: string;
  abutmentType: string;
  hideCrown: boolean;
  hideAbutment: boolean;
};

function Model({
  url,
  crownType,
  abutmentType,
  hideCrown,
  hideAbutment,
}: ModelProps) {
  const { scene } = useGLTF(url) as GLTF;
  const { gl } = useThree();
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  const applyMaterial = (node: THREE.Mesh, material: THREE.Material) => {
    node.material = material.clone();
  };

  const neutralEnvMap = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const env = pmrem.fromScene(new RoomEnvironment()).texture;
    pmrem.dispose();
    return env;
  }, [gl]);

  const crownMaterial = useMemo(() => {
    if (crownType === "LISI") {
      return new THREE.MeshPhysicalMaterial({
        color: "#ede0cc",
        roughness: 0.3,
        transmission: 0.12,
        thickness: 1.0,
        clearcoat: 0.5,
        clearcoatRoughness: 0.25,
        ior: 1.52,
        envMapIntensity: 0.9,
      });
    }
    if (crownType === "PFM") {
      return new THREE.MeshPhysicalMaterial({
        color: "#e8d9c4",
        roughness: 0.35,
        metalness: 0,
        clearcoat: 0.4,
        clearcoatRoughness: 0.35,
        envMapIntensity: 0.8,
      });
    }
    return null; // Zirconia keeps original material
  }, [crownType]);

  const abutmentMaterial = useMemo(() => {
    switch (abutmentType) {
      case "Titanium":
        return new THREE.MeshStandardMaterial({
          color: "#ffffff",
          metalness: 1.0,
          roughness: 0,
        });
      case "Anodised":
        return new THREE.MeshStandardMaterial({
          color: "#d7c37d",
          metalness: 0.9,
          roughness: 0,
        });
      case "Zirconia":
        return new THREE.MeshStandardMaterial({
          color: "#e8e2d8",
          metalness: 0,
          roughness: 0.18,
          envMap: neutralEnvMap,
          envMapIntensity: 1.2,
        });
      default:
        return null;
    }
  }, [abutmentType, neutralEnvMap]);

  useEffect(() => {
    if (!scene) return;
    const clone = SkeletonUtils.clone(scene);
    clone.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      const name = node.name.toLowerCase();
      if (name.includes("crown")) {
        if (crownMaterial) applyMaterial(node, crownMaterial);
        node.visible = !hideCrown;
      }
      if (name.includes("abutment")) {
        if (abutmentMaterial) applyMaterial(node, abutmentMaterial);
        node.visible = !hideAbutment;
      }
      if (name.includes("plane")) node.visible = false;
      node.castShadow = true;
      node.receiveShadow = true;
    });
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const scale = 4 / Math.max(size.x, size.y, size.z);
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    clone.scale.set(scale, scale, scale);
    setModel(clone);
  }, [scene, crownMaterial, abutmentMaterial, hideCrown, hideAbutment]);

  return model ? <primitive object={model} /> : null;
}

useGLTF.preload("/3d-model/For_web_test.glb");

// ============================================================
// PAGE COMPONENT (updated lighting)
// ============================================================
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const productName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [selectedCrown, setSelectedCrown] = useState("Zirconia");
  const [selectedAbutment, setSelectedAbutment] = useState("Titanium");
  const [hideCrown, setHideCrown] = useState(false);
  const [hideAbutment, setHideAbutment] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [modelError, setModelError] = useState(false);
  const controlsRef = useRef<any>(null);

  useEffect(() => setIsClient(true), []);

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
    const controls = controlsRef.current;
    controls.object.position.set(5, 3, 5);
    controls.target.set(0, 0, 0);
    controls.update();
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />

      <section className="pt-40 pb-20 px-6 lg:px-12 max-w-[900px] mx-auto">
        <Link
          href="/services/implants"
          className="inline-flex items-center text-gray-500 mb-10 hover:text-[#7ab88a] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Implants
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {productName}
          </h1>
        </div>

        <div className="space-y-6">
          {/* 3D VIEWER */}
          <div className="bg-gradient-to-b from-gray-50 to-[#a2d8b2]/20 rounded-[2rem] h-[550px] border border-[#a2d8b2]/30 overflow-hidden relative shadow-sm group">
            {isClient && !modelError && (
              <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleZoom("in")}
                  className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100 hover:bg-[#a2d8b2] hover:text-teal-950 transition-all duration-300 text-gray-600 hover:-translate-y-1"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleZoom("out")}
                  className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100 hover:bg-[#a2d8b2] hover:text-teal-950 transition-all duration-300 text-gray-600 hover:-translate-y-1"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={handleReset}
                  className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100 hover:bg-gray-100 transition-all duration-300 text-gray-600 mt-2 hover:-translate-y-1"
                  title="Reset View"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            )}

            {isClient && !modelError && (
              <Canvas
                gl={{
                  toneMappingExposure: 1.2, // increased exposure for brighter overall
                  toneMapping: THREE.ACESFilmicToneMapping,
                }}
                camera={{ position: [5, 3, 5], fov: 40, near: 0.1, far: 1000 }}
                onError={() => setModelError(true)}
              >
                <Suspense fallback={null}>
                  {/* Environment with higher intensity */}
                  <Environment
                    files="/3d-model/industrial-room.exr"
                    background={false}
                    environmentIntensity={1.3} // boost env brightness
                  />

                  {/* ========== UPDATED LIGHTING FOR STRONG LEFT CROWN GLOW ========== */}

                  {/* Ambient – slightly warmer */}
                  <ambientLight intensity={1} color="rgb(252, 252, 252)" />

                  {/* Right main light – reduced slightly so left becomes dominant */}
                  <directionalLight
                    position={[9, 9, 9]}
                    intensity={1}
                    color="#fff5ea"
                    castShadow
                  />

                  {/* ★★★ STRONG LEFT DIRECTIONAL LIGHT (main glow) ★★★ */}
                  <directionalLight
                    position={[-5, 7, 2]} // higher and more left
                    intensity={1}        // much brighter
                    color="#fff8e8"
                    castShadow
                  />

                  {/* ★★★ INTENSE POINT LIGHT for localised glow on upper-left crown ★★★ */}
                  <pointLight
                    position={[2.2, 3.8, 1.8]}
                    intensity={4}
                    color="#fff8e8"
                    distance={4}
                    decay={1.8}
                  />

                  {/* Extra fill from front-left to lift the left edge */}
                  <directionalLight
                    position={[-3, 2, 4]}
                    intensity={1}
                    color="#fdddbc"
                  />

                  {/* Optional: very subtle back rim light to separate from background */}
                  <directionalLight
                    position={[1, 2, -5]}
                    intensity={0.5}
                    color="#ffffff"
                  />

                  <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Center>
                      <Model
                        url="/3d-model/For_web_test.glb"
                        crownType={selectedCrown}
                        abutmentType={selectedAbutment}
                        hideCrown={hideCrown}
                        hideAbutment={hideAbutment}
                      />
                    </Center>
                  </Float>

                  <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.5}
                    color="#444444"
                    scale={10}
                    blur={3}
                    far={4}
                  />
                </Suspense>

                <OrbitControls
                  ref={controlsRef}
                  enableZoom
                  enablePan
                  enableRotate
                  minDistance={2}
                  maxDistance={10}
                  autoRotate={true}
                  autoRotateSpeed={1.0}
                />
              </Canvas>
            )}

            {isClient && modelError && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-red-400 mb-3 font-medium">Unable to load 3D model</p>
                  <button
                    onClick={() => setModelError(false)}
                    className="px-6 py-2 bg-[#a2d8b2] text-gray-900 font-medium rounded-full hover:bg-[#8ec29e] transition-colors shadow-sm"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {!isClient && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#a2d8b2] mx-auto mb-4"></div>
                  <p className="text-gray-500 font-medium tracking-wide">Initializing 3D Viewer...</p>
                </div>
              </div>
            )}
          </div>

          {/* UI CONTROLS (unchanged) */}
          <div className="flex flex-col gap-6 bg-gray-50/50 p-6 rounded-[2rem] border border-[#a2d8b2]/20">
            {!hideCrown && (
              <div>
                <div className="flex justify-between items-center mb-3 ml-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                    Crown Material
                  </h3>
                  <button
                    onClick={() => setHideCrown(true)}
                    className="text-xs px-2 py-1 bg-red-50 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                  >
                    Hide Crown
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["Zirconia", "LISI", "PFM"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedCrown(item)}
                      className={`px-4 py-2.5 rounded-full border transition-all duration-300 font-medium ${
                        selectedCrown === item
                          ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/30"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {hideCrown && (
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-red-500">
                      Crown Hidden
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Crown is currently hidden in 3D model</p>
                  </div>
                  <button
                    onClick={() => setHideCrown(false)}
                    className="text-sm px-4 py-2 bg-[#a2d8b2] text-gray-900 hover:bg-[#8ec29e] rounded-full transition-colors font-medium"
                  >
                    Unhide Crown
                  </button>
                </div>
              </div>
            )}
            {!hideAbutment && (
              <div>
                <div className="flex justify-between items-center mb-3 ml-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                    Abutment Material
                  </h3>
                  <button
                    onClick={() => setHideAbutment(true)}
                    className="text-xs px-2 py-1 bg-red-50 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                  >
                    Hide Abutment
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["Titanium", "Zirconia", "Anodised"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedAbutment(item)}
                      className={`px-4 py-2.5 rounded-full border transition-all duration-300 font-medium ${
                        selectedAbutment === item
                          ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/30"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {hideAbutment && (
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-red-500">
                      Abutment Hidden
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Abutment is currently hidden in 3D model</p>
                  </div>
                  <button
                    onClick={() => setHideAbutment(false)}
                    className="text-sm px-4 py-2 bg-[#a2d8b2] text-gray-900 hover:bg-[#8ec29e] rounded-full transition-colors font-medium"
                  >
                    Unhide Abutment
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-400 text-center">
            Crown: {selectedCrown} | Abutment: {selectedAbutment} | Crown Hidden: {hideCrown ? "Yes" : "No"} | Abutment Hidden: {hideAbutment ? "Yes" : "No"}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
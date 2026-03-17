import { services } from "../../../components/data/services";
import ServiceDetailPage from "../../../components/services/ServiceDetailPage";

export default function CrownBridgePage() {
  const service = services.find((s) => s.slug === "crown-bridge")!;
  const others = services
    .filter((s) => s.slug !== "crown-bridge")
    .map(({ slug, title, category }) => ({ slug, title, category }));

  return <ServiceDetailPage service={service} otherServices={others} />;
}

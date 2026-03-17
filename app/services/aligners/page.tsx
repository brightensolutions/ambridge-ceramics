import { services } from "../../../components/data/services";
import ServiceDetailPage from "../../../components/services/ServiceDetailPage";

export default function AlignersPage() {
    const service = services.find((s) => s.slug === "aligners")!;
    const others = services
        .filter((s) => s.slug !== "aligners")
        .map(({ slug, title, category }) => ({ slug, title, category }));

    return <ServiceDetailPage service={service} otherServices={others} />;
}

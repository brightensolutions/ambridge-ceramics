import { services } from "../../../components/data/services";
import ServiceDetailPage from "../../../components/services/ServiceDetailPage";

export default function WhiteningPage() {
    const service = services.find((s) => s.slug === "whitening")!;
    const others = services
        .filter((s) => s.slug !== "whitening")
        .map(({ slug, title, category }) => ({ slug, title, category }));

    return <ServiceDetailPage service={service} otherServices={others} />;
}

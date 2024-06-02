import { api } from "@/trpc/server";
import { GuideList } from "../_components/guide-list";

export default async function GuidePage() {
  const guides = await api.guide.getGuide();

  return (
    <div className="flex">
      <GuideList guides={guides} />
    </div>
  );
}

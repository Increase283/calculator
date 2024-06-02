import { api } from "@/trpc/server";
import { RequestList } from "../_components/request-list";

export default async function RequestPage() {
  const requests = await api.request.getRequests();

  return (
    <div className="flex">
      <RequestList requests={requests} />
    </div>
  );
}

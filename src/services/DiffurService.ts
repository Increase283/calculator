import { $api } from "@/http/api";

export class DiffurSirvice {
  public static getAnswer(query: string): Promise<unknown> {
    return $api.post("/", { query });
  }
}

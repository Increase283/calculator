import { $api } from "@/http/api";
import { type ApiResponse } from "@/types/difur";

export class DiffurService {
  public static async getAnswer(query: string): Promise<ApiResponse> {
    const res = await $api.post<ApiResponse>("/", { query });
    return res.data;
  }
}

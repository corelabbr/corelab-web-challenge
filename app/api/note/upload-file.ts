import { FileUploadResponse } from "@/app/@types/types";
import api from "../axios";

export async function uploadFile(
  formData: FormData
): Promise<FileUploadResponse> {
  const response = await api
    .post<FileUploadResponse>("/notes/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => {
      console.error("Erro ao fazer upload do arquivo:", error);
      throw error;
    });
  return response.data;
}

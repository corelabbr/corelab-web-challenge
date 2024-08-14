import api from "../axios";

export async function createUser() {
  const response = await api.post<{ session_id: string }>("/user");
  if (
    (response.data as { session_id: string }) &&
    (response.data as { session_id: string }).session_id
  ) {
    return response.data.session_id;
  }
  return "Error";
}

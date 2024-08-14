import api from "../axios";

interface ReturnGetUser {
  _id: string;
  props: {
    session_id: string;
  };
}

export async function getUser(session_id: string) {
  const response = await api.get<ReturnGetUser>(
    `/user?sessionId=${session_id}`
  );
  return response;
}

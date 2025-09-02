import { v4 as uuid } from "uuid";

export function getUserId(): string {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuid();
    localStorage.setItem("userId", userId);
  }
  return userId;
}

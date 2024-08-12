import { useContext } from "react";

import { UserContext } from "../context/user";

export default function useUser() {
  return useContext(UserContext);
}

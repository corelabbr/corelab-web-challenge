import { createContext, useContext, useState, useEffect } from "react";
import { createUser } from "../api/user/create-user";
import { getUser } from "../api/user/get-user";

interface SessionContextProps {
  sessionId: string | null;
  userId: string | null;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const session_id = localStorage.getItem("session_id");

    if (!session_id) {
      const fetchUser = async () => {
        const response = await createUser();
        setSessionId(response);
        localStorage.setItem("session_id", response);
      };
      fetchUser();
    } else {
      setSessionId(session_id);
    }
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    const fetchUser = async () => {
      const response = await getUser(sessionId);
      setUserId(response.data._id);
    };
    fetchUser();
  });

  return (
    <SessionContext.Provider value={{ sessionId, userId }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

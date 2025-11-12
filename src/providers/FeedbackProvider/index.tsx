import React, { createContext, useContext, useState } from "react";
import Backdrop from "../../components/Backdrop";
import styles from "./FeedbackProvider.module.scss";

type ToastType = "success" | "error" | "info";

interface Toast {
  type: ToastType;
  title: string;
  message: string;
}

interface FeedbackContextProps {
  showToast: (toast: Toast) => void;
  showLoading: (show: boolean) => void;
}

const FeedbackContext = createContext<FeedbackContextProps>({
  showToast: () => {},
  showLoading: () => {},
});

export const useFeedback = () => useContext(FeedbackContext);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <FeedbackContext.Provider
      value={{
        showToast: setToast,
        showLoading: setLoading,
      }}
    >
      {children}
      {loading && (
        <Backdrop>
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 12,
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
            }}
          >
            <span>Carregando...</span>
          </div>
        </Backdrop>
      )}
      {toast && (
        <div className={`${styles.toast} ${styles[`toast--${toast.type}`]}`}>
          <strong>{toast.title}</strong>
          <div>{toast.message}</div>
        </div>
      )}
    </FeedbackContext.Provider>
  );
};

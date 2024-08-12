"use client";

import { Inter } from "next/font/google";
import { ThreeCircles } from "react-loader-spinner";

import Modal from "./components/modal";
import useNotes from "./hooks/notes";
import useTheme from "./hooks/useTheme";

const inter = Inter({ subsets: ["latin"] });

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const { loading } = useNotes();
  return (
    <html lang="en" className={theme}>
      <body className={inter.className}>
        {children}
        <Modal show={loading}>
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#FFA000"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </Modal>
      </body>
    </html>
  );
};

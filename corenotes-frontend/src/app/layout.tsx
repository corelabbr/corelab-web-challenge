"use client";

import { Inter } from "next/font/google";
import "../../global_styles/globals.scss";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}

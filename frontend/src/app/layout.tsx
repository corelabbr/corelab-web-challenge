import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TodoContextProvider } from "@/context/TodoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Core Notes",
  description: "Create your to-do list with us",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TodoContextProvider>{children}</TodoContextProvider>
      </body>
    </html>
  );
}

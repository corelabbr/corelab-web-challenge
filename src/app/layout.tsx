import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";

import NotesProvider from "./context/notes";
import ThemeProvider from "./context/theme";
import UserProvider from "./context/user";
import { RootProvider } from "./layout-provider";

export const metadata: Metadata = {
  title: "Core Notes",
  description: "A simple note-taking app",
  icons: [
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/site.webmanifest",
      rel: "manifest",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotesProvider>
          <RootProvider>{children}</RootProvider>
        </NotesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.scss";

const league_Spartan = League_Spartan({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Todo - Corelab"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${league_Spartan.className}`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import React from 'react';


export const metadata: Metadata = {
  title: 'Core Notes',
  description: 'A simple and efficient application to manage your daily tasks',
  keywords: ['tasks', 'productivity', 'organization', 'to-do'],
  authors: [{ name: 'David Botelho' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}

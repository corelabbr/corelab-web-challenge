import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'react-circular-progressbar/dist/styles.css'
import { Header } from './components/Header'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Corelab',
  description: 'Notes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-background')}>
        <Providers>
          <Header className="mb-6" />
          {children}
        </Providers>
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { Navigation } from "@/components/navigation"
import ErrorBoundary from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admania",
  description: "Video-only platform for horizontal advertisements",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ErrorBoundary>
            <div className="min-h-screen bg-background text-foreground">
              <Navigation />
              <main className="container mx-auto px-4 py-8">{children}</main>
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}


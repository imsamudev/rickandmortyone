import "./globals.css";
import Header from "@/components/UI/Header/Header";
import { Providers } from "./providers";

export const metadata = {
  title: 'Rick & Morty One',
  description: 'Generated by Next.js, project Rick and Morty One, a better version than previos project Rick and Morty.',
  keywords: 'Rick and Morty, API, Next, Project, Science Fiction, Animated Series',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Providers>
          <Header />
          <main className="container mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html >
  )
}

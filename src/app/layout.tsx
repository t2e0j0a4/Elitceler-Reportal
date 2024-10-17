import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

// Nextjs Top Loader
import NextTopLoader from "nextjs-toploader";

// Toaster
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700"]});

export const metadata: Metadata = {
  title: 'Builder Portal | Admin',
  description: 'A Builder portal admin panel...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextTopLoader color="var(--primary)" height={4} crawl={true} showSpinner={false} easing="ease-in" />
        <Toaster position="top-right" gutter={8} containerStyle={{ fontSize: '0.88rem' }} />
        {children}
      </body>
    </html>
  )
}

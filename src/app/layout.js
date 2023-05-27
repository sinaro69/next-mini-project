import Navbar from '@/components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import Loading from './loading'
import Footer from '@/components/footer'
import Head from 'next/head'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shopify',
  description: 'In an online product store, customers can browse and purchase products from the comfort of their own home using a computer or mobile device. ',
  thumbnail: 'https://play-lh.googleusercontent.com/PaSl-oIRK6C8AoKsAcNtBUNmN5jb2n2AaPHRhlxor_DJAxUG3UAETE7CDmTkn9Duwq0=s256-rw',
  openGraph: {
    images: ['https://play-lh.googleusercontent.com/PaSl-oIRK6C8AoKsAcNtBUNmN5jb2n2AaPHRhlxor_DJAxUG3UAETE7CDmTkn9Duwq0=s256-rw'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="./clothing-icon-png-17.jpg" />
      </Head>
      <body>
        <Navbar />        
          {children}
        <Footer />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
      </body>
    </html>
  )
}

import type { Metadata } from "next";
import { Geist, Geist_Mono , Bebas_Neue} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";


const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas-neue',
  display: 'swap',   // Add this line
  preload: false    // Add this line
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumbini lions",
  description: "Home of the lions",
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    shortcut: { url: '/logo.png' }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable}`}>
        <Navbar />
        <main className="overflow-x-hidden overflow-y-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
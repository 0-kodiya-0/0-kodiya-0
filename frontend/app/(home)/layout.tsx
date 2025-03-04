import { JetBrains_Mono, Inter } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sanithu Jayakody | Portfolio",
  description: "Backend Whisperer & Code Enthusiast. Hi, I'm Sanithu, a Full Stack Developer passionate about optimizing and scaling backend systems. Still learning, still growing!",

  authors: [{ name: "Sanithu Jayakody", url: "https://sanithu-jayakody.me" }],
  creator: "Sanithu Jayakody",
  publisher: "Sanithu Jayakody",

  keywords: ["Sanithu Jayakody", "Portfolio", "Developer", "Projects", "Skills", "Professional Experience"],

  robots: {
    index: true,
    follow: true
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetBrainsMono.variable} ${inter.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          <main className="min-h-screen flex flex-col">
            <Navbar />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
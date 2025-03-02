import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanithu Jayakody | Portfolio",
  description: "Backend Whisperer & Code Enthusiast. Hi, I'm Sanithu, a Full Stack Developer passionate about optimizing and scaling backend systems. Still learning, still growing!",

  authors: [{ name: "Sanithu Jayakody", url: "https://sanithu-jayakody.com" }],
  creator: "Sanithu Jayakody",
  publisher: "Sanithu Jayakody",

  keywords: ["Sanithu Jayakody", "Portfolio", "Developer", "Projects", "Skills", "Professional Experience"],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "profile",
    title: "Sanithu Jayakody | Developer Portfolio",
    description: "Backend Whisperer & Code Enthusiast. Full Stack Developer passionate about optimizing and scaling backend systems. Still learning, still growing!",
    siteName: "Sanithu Jayakody Portfolio",
    images: [
      {
        url: "/images/profile-og.jpg", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Sanithu Jayakody Portfolio Preview",
      }
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sanithu Jayakody | Portfolio",
    description: "Backend Whisperer & Code Enthusiast. Full Stack Developer focused on backend optimization and scaling.",
    images: ["/images/profile-twitter.jpg"], // Replace with your actual Twitter card image
    creator: "@sanithu", // Replace with your actual Twitter handle if you have one
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
  },

  // Optional verification for search engines
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code if needed
  },

  // Optional canonical URL
  alternates: {
    canonical: "https://sanithu-jayakody.com", // Replace with your actual domain
  },
};

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  style: "normal"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

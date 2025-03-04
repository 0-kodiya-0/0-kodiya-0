import { JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css"

const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Admin - Portfolio",
    description: "Admin for portfolio website",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${jetBrainsMono.variable} antialiased`}>
                <main className="min-h-screen flex flex-col bg-background">
                    {children}
                </main>
            </body>
        </html>
    );
}
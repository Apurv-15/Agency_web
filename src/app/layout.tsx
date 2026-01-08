import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LUCID - AI Automation & Digital Solutions",
  description: "Transform your business with premium AI automation services, custom AI development, and scalable digital solutions. Boost efficiency and drive growth with intelligent automation.",
  keywords: ["AI automation", "digital solutions", "AI consulting", "workflow automation", "custom AI development", "chatbots", "virtual assistants"],
  authors: [{ name: "LUCID" }],
  openGraph: {
    title: "LUCID - AI Automation & Digital Solutions",
    description: "Transform your business with premium AI automation services and scalable digital solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

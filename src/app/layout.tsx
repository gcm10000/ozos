import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from '@next/third-parties/google'
import { API_CONFIG } from "@/config/api";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ozos",
  description: "Experts em criação de sites. Ajudamos empresas e profissionais a exibir seu trabalho com sites de portfólio modernos, responsivos e tecnologicamente avançados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        {!!API_CONFIG.googleAnalyticsId &&
          <GoogleAnalytics gaId={API_CONFIG.googleAnalyticsId} />
        }
      </body>
    </html>
  );
}

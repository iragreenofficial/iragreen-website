import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ira Green | Official Website",
  description:
    "Sito ufficiale di Ira Green. Voce rock, attitudine metal, musica, concerti, shop ufficiale e booking.",
  metadataBase: new URL("https://www.iragreen.it"),

  openGraph: {
    title: "Ira Green | Official Website",
    description:
      "Voce rock. Attitudine metal. Nessun filtro. Nessuna scusa.",
    url: "https://www.iragreen.it",
    siteName: "Ira Green",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ira Green Official Website",
      },
    ],
    locale: "it_IT",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ira Green | Official Website",
    description:
      "Voce rock. Attitudine metal. Nessun filtro. Nessuna scusa.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

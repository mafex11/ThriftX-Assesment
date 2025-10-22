import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Script from 'next/script'

export const revalidate = 3600;

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "ThriftX",
    template: "%s | ThriftX",
  },
  applicationName: "ThriftX",
  description:
    "Connecting Mumbai's independent thrift stores with shoppers across India—powering circular fashion while helping small businesses thrive.",
  keywords: [
    "thrift",
    "secondhand",
    "vintage",
    "Mumbai",
    "circular fashion",
    "sustainable shopping",
    "independent stores",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "ThriftX",
    title: "ThriftX",
    description:
      "Connecting Mumbai's independent thrift stores with shoppers across India—powering circular fashion while helping small businesses thrive.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ThriftX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ThriftX",
    description:
      "Connecting Mumbai's independent thrift stores with shoppers across India—powering circular fashion while helping small businesses thrive.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} antialiased font-sans`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Script 
          src="https://layerpathassessment.vercel.app/tracker.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

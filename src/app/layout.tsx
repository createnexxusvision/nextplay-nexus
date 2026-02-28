import type { Metadata } from "next";
import { Oswald, Open_Sans, Poppins, Raleway, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-raleway",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NextPlay Nexus | AI-Powered NIL Intelligence Platform",
    template: "%s | NextPlay Nexus",
  },
  description: "The player-centered platform combining NIL literacy, athlete development, and parent education for high school and college programs across 6 sports.",
  keywords: ["NIL platform", "athlete development", "college sports", "name image likeness", "NIL deals", "sports technology"],
  authors: [{ name: "NextPlay Nexus" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "NextPlay Nexus",
    title: "NextPlay Nexus | AI-Powered NIL Intelligence Platform",
    description: "NIL literacy, athlete development, and brand matching for high school and college programs.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextPlay Nexus",
    description: "AI-Powered NIL Intelligence Platform for athletes, programs, and brands.",
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
      className={`${oswald.variable} ${openSans.variable} ${poppins.variable} ${raleway.variable} ${robotoMono.variable}`}
    >
      <body style={{ fontFamily: "var(--font-body)" }}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

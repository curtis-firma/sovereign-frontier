import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sovereign-frontier.netlify.app"),
  title: {
    default: "The Sovereign Frontier",
    template: "%s — The Sovereign Frontier",
  },
  description:
    "A field guide to nations, network states, sovereignty, and settlement — from foundational political language to a living Settlemint case study.",
  openGraph: {
    title: "The Sovereign Frontier",
    description:
      "A field guide to nations, network states, sovereignty, and settlement.",
    siteName: "The Sovereign Frontier",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
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
        className={`${newsreader.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

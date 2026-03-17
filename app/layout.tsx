import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import PostHogProvider from "@/components/PostHogProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Longevity Score — How Aligned Is Your Lifestyle? | LongeviQuest",
  description:
    "Discover how your lifestyle compares to the world's longest-lived people. Take the free Longevity Score assessment from LongeviQuest, the global authority on supercentenarians.",
  openGraph: {
    title: "What's Your Longevity Score?",
    description:
      "Find out how your habits compare to the world's longest-lived people.",
    url: "https://longeviquest.com/longevity-score/",
    siteName: "LongeviQuest",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Longevity Score by LongeviQuest",
      },
    ],
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
      <body className={`${manrope.variable} antialiased`}>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}

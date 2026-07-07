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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "interviewmethod — brutal AI mock interviews with a hiring-manager scorecard",
    template: "%s · interviewmethod",
  },
  description:
    "Realistic AI mock interviews with the feedback nobody will give you: a hire/no-hire verdict, five scored dimensions, your weak phrases quoted back, and every answer rewritten stronger. First interview free.",
  keywords: [
    "AI mock interview",
    "interview practice",
    "interview feedback",
    "hiring manager scorecard",
    "behavioral interview practice",
    "brutal interview feedback",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "interviewmethod",
    title: "The interview feedback nobody will give you",
    description:
      "A realistic AI mock interview, then the document candidates never see: the hiring manager's private scorecard — verdict, scores, weak phrases quoted, answers rewritten stronger.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "interviewmethod — get roasted, get hired",
    description:
      "Brutal AI mock interviews with a hiring-manager scorecard. First interview free.",
  },
  robots: { index: true, follow: true },
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

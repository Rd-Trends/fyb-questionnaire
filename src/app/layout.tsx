import Layout from "@/components/Layout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Great_Vibes, Ms_Madi, Style_Script } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});
const msMadi = Ms_Madi({
  variable: "--font-ms-madi",
  weight: "400",
  subsets: ["latin"],
});
const styleScript = Style_Script({
  variable: "--font-style-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FYB Questionnaire",
  description: "Generate images for your answers to the FYB Questionnaire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${greatVibes.variable} ${msMadi.variable} ${styleScript.variable}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

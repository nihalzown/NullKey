// --- CHANGE: Ensuring Web3Provider strictly wraps the children ---
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/components/providers/Web3Provider"; // Ensure this import exists!

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NullKey | Decentralized Identity",
  description: "Passwordless Authentication via Web3 Signatures", // [cite: 7]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col`}
      >
        {/* The Provider MUST wrap children for the context to flow down to the Connect Button */}
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
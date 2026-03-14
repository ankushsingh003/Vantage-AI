import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vantage AI | Market Intelligence",
  description: "Next-generation market trajectory prediction and strategic auditing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="pt-[--navbar-height]">
          {children}
        </main>
      </body>
    </html>
  );
}

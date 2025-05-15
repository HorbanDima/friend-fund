import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { SolanaProvider } from "@/components/SolanaProvider";

export const metadata: Metadata = {
  title: "FriendFund",
  description: "Micro-crowdfunding with Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SolanaProvider>
        <Header/>        
        {children}
        </SolanaProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/providers/store-provider";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Risk Pyramid",
  description: "You have been managing your risk, right anon?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`m-0 p-0 lg:h-screen ${inter.className}`}>
        <StoreProvider>
          <Navigation />
          <main className="max-w-7xl m-auto p-8 py-32 flex flex-col gap-8 items-center">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}

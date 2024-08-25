import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "next-themes";
import { UIContextProvider } from "./_context/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Talk to Your Knowledge Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <UIContextProvider>
          <Providers>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
          </Providers>
        </UIContextProvider>
      </body>
    </html>
  );
}

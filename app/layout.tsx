// "use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import MainLayout from "./components/Layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "paHa Exercise App",
  description: "paHa Exercise App",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>
          <ReduxProvider>{children}</ReduxProvider>
        </MainLayout>
      </body>
    </html>
  );
}

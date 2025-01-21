import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/utils";
import { beaufortPro, lato } from "../fonts";
import AbstractProvider from "@/AbstractProvider";

export const metadata: Metadata = {
  title: "WITS Idle Game",
  description: "This is the WITS Idle Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={beaufortPro.className}>
        <AbstractProvider>
          <div id="modal" className="fixed z-50"></div>
          {children}
        </AbstractProvider>
      </body>
    </html>
  );
}

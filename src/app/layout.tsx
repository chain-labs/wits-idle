import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/utils";
import { beaufortPro, lato } from "../fonts";

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
        <div id="modal" className="fixed z-50"></div>
        {children}
      </body>
    </html>
  );
}

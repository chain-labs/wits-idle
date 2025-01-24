import type { Metadata } from "next";
import "./globals.css";
import { beaufortPro } from "../fonts";
import MegaWrapper from "./MegaWrapper";

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
        <MegaWrapper>{children}</MegaWrapper>
      </body>
    </html>
  );
}

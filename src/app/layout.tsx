import type { Metadata } from "next";
import "./globals.css";
import { beaufortPro, lato } from "../fonts";
import AbstractProvider from "@/AbstractProvider";
import AppWrapper from "./AppWrapper";
import AccountWrapper from "./AccountWrapper";

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
        <AppWrapper>
          <AbstractProvider>
            <AccountWrapper>
              <div id="modal" className="fixed z-50"></div>
              {children}
            </AccountWrapper>
          </AbstractProvider>
        </AppWrapper>
      </body>
    </html>
  );
}

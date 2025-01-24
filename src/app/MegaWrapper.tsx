"use client";

import dynamic from "next/dynamic";

const AppWrapper = dynamic(() => import("./AppWrapper"), {
  ssr: false,
});

const AccountWrapper = dynamic(() => import("./AccountWrapper"), {
  ssr: false,
});

const AbstractProvider = dynamic(() => import("@/AbstractProvider"), {
  ssr: false,
});

export default function MegaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AbstractProvider>
      <AppWrapper>
        <AccountWrapper>
          <div id="modal" className="fixed z-50"></div>
          {children}
        </AccountWrapper>
      </AppWrapper>
    </AbstractProvider>
  );
}

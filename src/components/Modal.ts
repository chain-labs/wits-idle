"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Model({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = "100%";
    elRef.current = div;
  }

  console.log("elRef", elRef);

  useEffect(() => {
    const modalRoot = document.getElementById("modal") as HTMLDivElement;
    modalRoot.style.width = "100vw";
    modalRoot.style.height = "100vh";
    document.body.style.overflow = "hidden";
    console.log("modalRoot", modalRoot);
    if (!modalRoot) {
        return;
    }
    modalRoot.appendChild(elRef.current as HTMLDivElement);
    return () => {
        modalRoot.style.width = "auto";
        modalRoot.style.height = "auto";
        document.body.style.overflow = "auto";
      modalRoot.removeChild(elRef.current as HTMLDivElement);
    };
  }, []);

  return createPortal(
    children as React.ReactNode,
    elRef.current as HTMLDivElement,
    "modal",
  );
}

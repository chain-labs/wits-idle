"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function ModalRevealAnimation({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full h-full"
        initial={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
        animate={{ clipPath: ["polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)", "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", "polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 0% 50%)"] }}
        exit={{ clipPath: ["polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 0% 50%)", "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)"] }}
        transition={{ duration: 0.75 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

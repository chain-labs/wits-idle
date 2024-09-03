"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimateNumber({ num }: { num: number }) {
  const [numberState, setNumberState] = useState<number | null>(0);
  useEffect(() => {
    if (numberState === num) return;
    setNumberState(num);
    const interval = setTimeout(() => {}, 500);

    return () => {
      clearTimeout(interval);
    };
  }, [num]);

  return (
    <AnimatePresence>
      {num === numberState ? (
        <motion.span
          className="w-[1ch]"
          initial={{ opacity: 0, y: "1em" }}
          animate={{ opacity: 1, y: "0em" }}
          exit={{ opacity: 0, y: "1em" }}
        >
          {numberState}
        </motion.span>
      ) : (
        <span className="w-[1ch]"></span>
      )}
    </AnimatePresence>
  );
}

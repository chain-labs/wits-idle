"use client";

import { useEffect, useState } from "react";

const newTimer = new Date().getTime() + 1000 * 60 * 60;

export default function useTimer() {
  const [time, setTime] = useState(Math.floor((newTimer - new Date().getTime()) / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return {
    days: Math.floor(time / 86400),
    hours: Math.floor((time % 86400) / 3600),
    minutes: Math.floor((time % 3600) / 60),
    seconds: time % 60,
  };
}
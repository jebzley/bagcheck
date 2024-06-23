"use client";

import { useEffect, useState } from "react";

export function Delayed({
  children,
  delayMs = 200,
}: {
  children: React.ReactNode;
  delayMs?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [delayMs]);

  return isVisible ? children : null;
}

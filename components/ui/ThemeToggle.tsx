"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "qa-radar-theme";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      document.documentElement.setAttribute("data-theme", stored);
    }
    setMounted(true);
  }, []);

  function toggleTheme() {
    const el = document.documentElement;
    let current = el.getAttribute("data-theme") ?? "auto";
    if (current === "auto") {
      current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    const next = current === "dark" ? "light" : "dark";
    el.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  if (!mounted) {
    return (
      <button type="button" className="btn secondary sm theme-toggle" aria-label="Toggle light or dark theme">
        Theme
      </button>
    );
  }

  return (
    <button
      type="button"
      className="btn secondary sm theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle light or dark theme"
    >
      <span className="moon" aria-hidden="true">
        🌙
      </span>
      <span className="sun" aria-hidden="true">
        ☀️
      </span>{" "}
      Theme
    </button>
  );
}

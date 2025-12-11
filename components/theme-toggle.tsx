"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleStorage = () => {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };

    globalThis.addEventListener("storage", handleStorage);
    return () => globalThis.removeEventListener("storage", handleStorage);
  }, [mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    globalThis.dispatchEvent(new Event("storage"));
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
        <div className="w-5 h-5" />
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : -180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/subjects", label: "Subjects" },
    { href: "/boards", label: "Boards" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              StudyHub
            </div>
          </motion.div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-8">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary relative py-2 block",
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="navbar-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

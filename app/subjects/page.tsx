"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { subjects } from "@/lib/subjects";

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Choose Your Subject
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Select a subject to access past papers and practice materials
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1 + 0.5,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/subjects/${subject.id}`} className="block h-full">
                <Card
                  className={`p-6 h-full transition-all duration-300 hover:shadow-xl bg-gradient-to-br ${subject.color} border-2 hover:border-primary/50 group`}
                >
                  <div className="space-y-3">
                    <motion.div
                      className="text-5xl mb-2"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {subject.icon}
                    </motion.div>
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {subject.name}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {subject.description}
                    </p>
                    <div className="pt-2 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View Papers
                      <svg
                        className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Subject } from "@/lib/subjects";
import type { ExamPaper } from "@/lib/exam-papers";

interface SubjectDetailClientProps {
  subject: Subject;
  papersByYear: Record<number, ExamPaper[]>;
  years: number[];
}

export function SubjectDetailClient({
  subject,
  papersByYear,
  years,
}: Readonly<SubjectDetailClientProps>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/subjects"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Subjects
            </Link>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="text-6xl"
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {subject.icon}
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {subject.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {subject.description}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Papers by Year */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {years.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No papers available yet. Check back soon!
                </p>
              </Card>
            </motion.div>
          ) : (
            years.map((year, yearIndex) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + yearIndex * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <motion.h2
                  className="text-2xl font-bold mb-4 flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + yearIndex * 0.15 + 0.1,
                  }}
                >
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg">
                    {year}
                  </span>
                </motion.h2>
                <div className="grid gap-3">
                  {papersByYear[year].map((paper, index) => (
                    <motion.div
                      key={`${paper.session}-${paper.variant}-${year}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + yearIndex * 0.15 + 0.2 + index * 0.05,
                      }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="p-4 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="text-2xl"
                                whileHover={{ rotate: 10, scale: 1.2 }}
                              >
                                📄
                              </motion.div>
                              <div>
                                <h3 className="font-semibold group-hover:text-primary transition-colors">
                                  {paper.session} - {paper.variant}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {subject.name} {year}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Button
                            asChild
                            variant="outline"
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            <a
                              href={paper.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              Open PDF
                            </a>
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Info Note */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex gap-3">
              <motion.div
                className="text-2xl"
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                💡
              </motion.div>
              <div>
                <h3 className="font-semibold mb-1">Study Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Practice with past papers regularly. Start with older papers
                  and work your way up to recent ones. Review marking schemes to
                  understand what examiners look for.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Download, ExternalLink } from "lucide-react";
import type { Subject } from "@/lib/subjects";
import type { ExamPaper } from "@/lib/exam-papers";
import { getSubjectConfig, detectPaperType } from "@/lib/subject-config";

interface SubjectDetailClientProps {
  subject: Subject;
  papersByYear: Record<number, ExamPaper[]>;
  papersByType: Record<string, { year: number; papers: ExamPaper[] }[]>;
  years: number[];
}

export function SubjectDetailClient({
  subject,
  papersByYear,
  years,
}: Readonly<SubjectDetailClientProps>) {
  const config = getSubjectConfig(subject.id);

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
            className="flex items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="text-5xl sm:text-6xl"
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {subject.icon}
            </motion.div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {subject.name}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                {subject.description}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Papers Display - Collapsible by Year */}
        <div className="max-w-4xl mx-auto">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="overflow-hidden">
                <Accordion type="multiple" className="w-full">
                  {years.map((year) => {
                    const sortedPapers = papersByYear[year].toSorted((a, b) => {
                      // Sort by variant (e.g., "Paper 12" -> 12, "Paper 21" -> 21)
                      const extractNumber = (variant: string) => {
                        const match = variant.match(/\d+/);
                        return match ? Number.parseInt(match[0]) : 0;
                      };
                      return (
                        extractNumber(a.variant) - extractNumber(b.variant)
                      );
                    });

                    return (
                      <AccordionItem key={year} value={`year-${year}`}>
                        <AccordionTrigger className="px-6 hover:bg-muted/50">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-primary">
                              {year}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({sortedPapers.length} paper
                              {sortedPapers.length === 1 ? "" : "s"})
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6">
                          <div className="space-y-2 pt-2">
                            {sortedPapers.map((paper, index) => {
                              const paperType = config
                                ? detectPaperType(paper.variant, config)
                                : null;

                              return (
                                <motion.div
                                  key={`${paper.session}-${paper.variant}-${year}`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.05,
                                  }}
                                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                      <span className="text-2xl">📄</span>
                                      <div>
                                        <p className="font-medium">
                                          {paper.session} - {paper.variant}
                                        </p>
                                        {paperType && (
                                          <p className="text-xs text-muted-foreground">
                                            {paperType.name}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      asChild
                                      size="sm"
                                      variant="outline"
                                      className="gap-2"
                                    >
                                      <a
                                        href={paper.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                        View
                                      </a>
                                    </Button>
                                    <Button
                                      asChild
                                      size="sm"
                                      variant="default"
                                      className="gap-2"
                                    >
                                      <a href={paper.pdfUrl} download>
                                        <Download className="h-4 w-4" />
                                        Download
                                      </a>
                                    </Button>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Study Tips */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <span>💡</span> Study Tip
            </h3>
            <p className="text-muted-foreground text-sm">
              Practice with papers from multiple years to understand question
              patterns. Review mark schemes after attempting each paper to learn
              from your mistakes.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

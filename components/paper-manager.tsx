"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Trash2, Download } from "lucide-react";
import { subjects } from "@/lib/subjects";
import type { ExamPaper } from "@/lib/exam-papers";
import { toast } from "sonner";

export function PaperManager() {
  const [papers, setPapers] = useState<Record<string, ExamPaper[]>>({});
  const [originalPapers, setOriginalPapers] = useState<
    Record<string, ExamPaper[]>
  >({});
  const [isEditing, setIsEditing] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  useEffect(() => {
    // Load papers from API
    fetch("/api/papers")
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
        setOriginalPapers(data); // Store original data
      })
      .catch(() => {
        // Fallback to empty object if API fails
        setPapers({});
        setOriginalPapers({});
      });
  }, []);

  // Warn user before leaving page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEditing) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isEditing]);

  // Intercept navigation clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isEditing) return;

      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link?.href && !link?.href.includes("#")) {
        e.preventDefault();
        e.stopPropagation();
        setShowUnsavedDialog(true);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isEditing]);

  const addPaper = useCallback((subjectId: string) => {
    const newPaper: ExamPaper = {
      year: new Date().getFullYear(),
      session: "May/June",
      variant: "Paper 11",
      paperNumber: "1",
      pdfUrl: "#",
    };

    setPapers((prev) => ({
      ...prev,
      [subjectId]: [...(prev[subjectId] || []), newPaper],
    }));
    setIsEditing(true);
  }, []);

  const removePaper = useCallback((subjectId: string, index: number) => {
    setPapers((prev) => ({
      ...prev,
      [subjectId]: prev[subjectId].filter((_, i) => i !== index),
    }));
    setIsEditing(true);
  }, []);

  const updatePaper = (
    subjectId: string,
    index: number,
    field: keyof ExamPaper,
    value: string | number
  ) => {
    setPapers((prev) => ({
      ...prev,
      [subjectId]: prev[subjectId].map((paper, i) =>
        i === index ? { ...paper, [field]: value } : paper
      ),
    }));
    setIsEditing(true);
  };

  const saveToJson = useCallback(async () => {
    try {
      // Save to server via API
      const response = await fetch("/api/papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(papers),
      });

      if (response.ok) {
        setIsEditing(false);
        setOriginalPapers(papers); // Update original papers after successful save
        toast.success("Papers saved successfully!", {
          description: "All changes have been saved to the server.",
        });
      } else {
        toast.error("Failed to save papers", {
          description: "Please try again or check your connection.",
        });
      }
    } catch (error) {
      console.error("Error saving papers:", error);
      toast.error("Error saving papers", {
        description: "An unexpected error occurred.",
      });
    }
  }, [papers]);

  const downloadJson = useCallback(() => {
    const jsonString = JSON.stringify(papers, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exam-papers.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [papers]);

  const sortedSubjects = useMemo(
    () => subjects.toSorted((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const resetChanges = useCallback(() => {
    setPapers(originalPapers); // Restore original data
    setIsEditing(false);
    toast.info("Changes discarded", {
      description: "All unsaved changes have been reset.",
    });
  }, [originalPapers]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-card via-card to-primary/5 border-primary/10 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Quick Actions
              </h2>
              {isEditing && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Unsaved
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {isEditing
                ? "Remember to save your changes"
                : "All changes are saved"}
            </p>
          </div>
          <Button
            onClick={downloadJson}
            variant="outline"
            className="gap-2 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all shadow-sm w-full sm:w-auto"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
        </div>
      </Card>

      {/* Subject Accordion */}
      <Card className="overflow-hidden border-primary/10 shadow-md">
        <Accordion type="single" collapsible className="w-full">
          {sortedSubjects.map((subject) => {
            const subjectPapers = papers[subject.id] || [];
            return (
              <AccordionItem
                key={subject.id}
                value={subject.id}
                className="border-b border-border/50 last:border-0"
              >
                <AccordionTrigger className="px-6 py-5 hover:bg-gradient-to-r hover:from-muted/50 hover:to-primary/5 transition-all group [&>svg]:transition-transform no-underline hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md transition-shadow">
                        {subject.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {subject.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-muted-foreground">
                            {subjectPapers.length} paper
                            {subjectPapers.length === 1 ? "" : "s"}
                          </span>
                          {subjectPapers.length > 0 && (
                            <span className="h-1 w-1 rounded-full bg-primary/40"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 pt-4">
                    {/* Add Paper Button */}
                    <Button
                      onClick={() => addPaper(subject.id)}
                      className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all"
                    >
                      <Plus className="h-4 w-4" />
                      Add New Paper
                    </Button>

                    {/* Papers List */}
                    {subjectPapers.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No papers added yet
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {subjectPapers.map((paper, index) => (
                          <motion.div
                            key={`${subject.id}-paper-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="p-5 bg-gradient-to-br from-muted/40 to-muted/20 border border-border/50 rounded-xl space-y-4 hover:shadow-md transition-shadow"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {/* Year */}
                              <div>
                                <label
                                  htmlFor={`year-${subject.id}-${index}`}
                                  className="text-xs font-semibold text-foreground/70 mb-1.5 block uppercase tracking-wide"
                                >
                                  Year
                                </label>
                                <input
                                  id={`year-${subject.id}-${index}`}
                                  type="number"
                                  value={paper.year}
                                  onChange={(e) =>
                                    updatePaper(
                                      subject.id,
                                      index,
                                      "year",
                                      Number.parseInt(e.target.value)
                                    )
                                  }
                                  className="w-full px-3 py-2.5 bg-background border border-border/60 rounded-lg text-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                              </div>

                              {/* Session */}
                              <div>
                                <label
                                  htmlFor={`session-${subject.id}-${index}`}
                                  className="text-xs font-semibold text-foreground/70 mb-1.5 block uppercase tracking-wide"
                                >
                                  Session
                                </label>
                                <select
                                  id={`session-${subject.id}-${index}`}
                                  value={paper.session}
                                  onChange={(e) =>
                                    updatePaper(
                                      subject.id,
                                      index,
                                      "session",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2.5 bg-background border border-border/60 rounded-lg text-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                                >
                                  <option>May/June</option>
                                  <option>Oct/Nov</option>
                                  <option>Feb/Mar</option>
                                </select>
                              </div>

                              {/* Variant */}
                              <div>
                                <label
                                  htmlFor={`variant-${subject.id}-${index}`}
                                  className="text-xs font-semibold text-foreground/70 mb-1.5 block uppercase tracking-wide"
                                >
                                  Variant
                                </label>
                                <input
                                  id={`variant-${subject.id}-${index}`}
                                  type="text"
                                  value={paper.variant}
                                  onChange={(e) =>
                                    updatePaper(
                                      subject.id,
                                      index,
                                      "variant",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g., Paper 21"
                                  className="w-full px-3 py-2.5 bg-background border border-border/60 rounded-lg text-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                              </div>

                              {/* Paper Number */}
                              <div>
                                <label
                                  htmlFor={`paperNumber-${subject.id}-${index}`}
                                  className="text-xs font-semibold text-foreground/70 mb-1.5 block uppercase tracking-wide"
                                >
                                  Paper Number
                                </label>
                                <input
                                  id={`paperNumber-${subject.id}-${index}`}
                                  type="text"
                                  value={paper.paperNumber || ""}
                                  onChange={(e) =>
                                    updatePaper(
                                      subject.id,
                                      index,
                                      "paperNumber",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g., 2"
                                  className="w-full px-3 py-2.5 bg-background border border-border/60 rounded-lg text-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                              </div>

                              {/* PDF URL */}
                              <div className="md:col-span-2">
                                <label
                                  htmlFor={`pdfUrl-${subject.id}-${index}`}
                                  className="text-xs font-semibold text-foreground/70 mb-1.5 block uppercase tracking-wide"
                                >
                                  PDF URL
                                </label>
                                <input
                                  id={`pdfUrl-${subject.id}-${index}`}
                                  type="text"
                                  value={paper.pdfUrl}
                                  onChange={(e) =>
                                    updatePaper(
                                      subject.id,
                                      index,
                                      "pdfUrl",
                                      e.target.value
                                    )
                                  }
                                  placeholder="https://example.com/paper.pdf"
                                  className="w-full px-3 py-2.5 bg-background border border-border/60 rounded-lg text-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                              </div>
                            </div>

                            {/* Delete Button */}
                            <div className="flex justify-end">
                              <Button
                                onClick={() => removePaper(subject.id, index)}
                                variant="destructive"
                                size="sm"
                                className="gap-2"
                              >
                                <Trash2 className="h-4 w-4" />
                                Remove
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Card>

      {/* Instructions */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-2xl shadow-md flex-shrink-0">
            💡
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Quick Guide
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  1
                </span>
                <p className="text-muted-foreground">
                  Click on a subject to expand and view papers
                </p>
              </div>
              <div className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  2
                </span>
                <p className="text-muted-foreground">
                  Add new papers using the &ldquo;Add New Paper&rdquo; button
                </p>
              </div>
              <div className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  3
                </span>
                <p className="text-muted-foreground">
                  Fill in all paper details and PDF URL
                </p>
              </div>
              <div className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  4
                </span>
                <p className="text-muted-foreground">
                  Remove unwanted papers with the delete button
                </p>
              </div>
              <div className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  5
                </span>
                <p className="text-muted-foreground">
                  Save your changes to update the server
                </p>
              </div>
              <div className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  6
                </span>
                <p className="text-muted-foreground">
                  Export JSON for backup anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave? Your
              changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay on Page</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsEditing(false);
                setShowUnsavedDialog(false);
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Leave Without Saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Discord-style Fixed Bottom Save Bar */}
      {isEditing && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500/95 to-orange-600/95 backdrop-blur-sm border-t border-amber-400/30 shadow-2xl"
        >
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 max-w-6xl mx-auto">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl">⚠️</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    Careful — you have unsaved changes!
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm hidden sm:block">
                    Click Save Changes to update the papers on the server.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                <Button
                  onClick={resetChanges}
                  variant="ghost"
                  className="text-white hover:bg-white/20 hover:text-white flex-1 sm:flex-none text-sm"
                  size="sm"
                >
                  Reset
                </Button>
                <Button
                  onClick={saveToJson}
                  className="bg-white text-amber-600 hover:bg-white/90 font-semibold shadow-lg flex-1 sm:flex-none text-sm"
                  size="sm"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

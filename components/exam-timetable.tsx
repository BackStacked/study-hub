"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { ExamPaper } from "@/lib/exam-papers";

interface ExamEntry {
  code: string;
  syllabus: string;
  component: string;
  examDate: string;
  session: string;
  duration: string;
  batch?: string;
  reportingTime: string;
  startTime: string;
  endTime: string;
  fcsStart?: string;
  fcsEnd?: string;
}

interface ExamEntryWithDate extends ExamEntry {
  sortDate: Date;
  hasPaper?: boolean;
}

const examTimetable: ExamEntry[] = [
  // ESL (0510)
  {
    code: "0510/32",
    syllabus: "English as a Second Language",
    component: "Speaking 32",
    examDate: "29 Jan 26 - 10 Feb 26",
    session: "-",
    duration: "15m",
    reportingTime: "Schedule will be shared separately",
    startTime: "-",
    endTime: "-",
  },
  {
    code: "0510/12",
    syllabus: "English as a Second Language",
    component: "Reading and Writing 12",
    examDate: "09-Feb-26",
    session: "AM",
    duration: "2h",
    reportingTime: "9.00am",
    startTime: "9.30am",
    endTime: "11.30am",
  },
  {
    code: "0510/22",
    syllabus: "English as a Second Language",
    component: "Listening Multiple Choice 22",
    examDate: "11-Feb-26",
    session: "AM",
    duration: "50m",
    batch: "Batch 1",
    reportingTime: "9.00am",
    startTime: "9.25am",
    endTime: "10.15am",
    fcsStart: "10.15am",
    fcsEnd: "11.45am",
  },
  {
    code: "0510/22",
    syllabus: "English as a Second Language",
    component: "Listening Multiple Choice 22",
    examDate: "11-Feb-26",
    session: "AM",
    duration: "50m",
    batch: "Batch 2",
    reportingTime: "9.45am",
    startTime: "10.55am",
    endTime: "11.45am",
    fcsStart: "9.45am",
    fcsEnd: "10.55am",
  },
  // Physics (0625)
  {
    code: "0625/62",
    syllabus: "Physics",
    component: "Alternative to Practical 62",
    examDate: "05-Feb-26",
    session: "PM",
    duration: "1h",
    reportingTime: "1.00pm",
    startTime: "1.30pm",
    endTime: "2.30pm",
  },
  {
    code: "0625/32",
    syllabus: "Physics",
    component: "Theory (Core) 32",
    examDate: "11-Feb-26",
    session: "PM",
    duration: "1h 15m",
    reportingTime: "12.45pm",
    startTime: "1.15pm",
    endTime: "2.30pm",
  },
  {
    code: "0625/42",
    syllabus: "Physics",
    component: "Theory (Extended) 42",
    examDate: "11-Feb-26",
    session: "PM",
    duration: "1h 15m",
    reportingTime: "12.45pm",
    startTime: "1.15pm",
    endTime: "2.30pm",
  },
  {
    code: "0625/12",
    syllabus: "Physics",
    component: "Multiple Choice (Core) 12",
    examDate: "02-Mar-26",
    session: "PM",
    duration: "45m",
    reportingTime: "1.15pm",
    startTime: "1.45pm",
    endTime: "2.30pm",
  },
  {
    code: "0625/22",
    syllabus: "Physics",
    component: "Multiple Choice (Extended) 22",
    examDate: "02-Mar-26",
    session: "PM",
    duration: "45m",
    reportingTime: "1.15pm",
    startTime: "1.45pm",
    endTime: "2.30pm",
  },
  // ICT (0417)
  {
    code: "0417/21",
    syllabus: "Information and Communication Technology",
    component: "Practical Test 21",
    examDate: "29 Jan 26",
    session: "-",
    duration: "2h 15m",
    batch: "Batch 1",
    reportingTime: "7.00am",
    startTime: "7.30am",
    endTime: "9.45am",
    fcsStart: "9.45am",
    fcsEnd: "10.45am",
  },
  {
    code: "0417/21",
    syllabus: "Information and Communication Technology",
    component: "Practical Test 21",
    examDate: "29 Jan 26",
    session: "-",
    duration: "2h 15m",
    batch: "Batch 2",
    reportingTime: "9.15am",
    startTime: "10.30am",
    endTime: "12.45pm",
    fcsStart: "9.15am",
    fcsEnd: "10.30am",
  },
  {
    code: "0417/31",
    syllabus: "Information and Communication Technology",
    component: "Practical Test 31",
    examDate: "04 Feb 26",
    session: "-",
    duration: "2h 15m",
    batch: "Batch 1",
    reportingTime: "7.00am",
    startTime: "7.30am",
    endTime: "9.45am",
    fcsStart: "9.45am",
    fcsEnd: "10.45am",
  },
  {
    code: "0417/31",
    syllabus: "Information and Communication Technology",
    component: "Practical Test 31",
    examDate: "04 Feb 26",
    session: "-",
    duration: "2h 15m",
    batch: "Batch 2",
    reportingTime: "9.15am",
    startTime: "10.30am",
    endTime: "12.45pm",
    fcsStart: "9.15am",
    fcsEnd: "10.30am",
  },
  {
    code: "0417/12",
    syllabus: "Information and Communication Technology",
    component: "Theory 12",
    examDate: "09-Feb-26",
    session: "PM",
    duration: "1h 30m",
    reportingTime: "12.30pm",
    startTime: "1.00pm",
    endTime: "2.30pm",
  },
  // Maths (0580)
  {
    code: "0580/12",
    syllabus: "Mathematics",
    component: "Paper 12 Non-calculator (Core)",
    examDate: "06-Feb-26",
    session: "AM",
    duration: "1h 30m",
    reportingTime: "9.15am",
    startTime: "9.45am",
    endTime: "11.15am",
  },
  {
    code: "0580/22",
    syllabus: "Mathematics",
    component: "Paper 22 Non-calculator (Extended)",
    examDate: "06-Feb-26",
    session: "AM",
    duration: "2h",
    reportingTime: "9.15am",
    startTime: "9.45am",
    endTime: "11.45am",
  },
  {
    code: "0580/32",
    syllabus: "Mathematics",
    component: "Paper 32 Calculator (Core)",
    examDate: "13-Feb-26",
    session: "AM",
    duration: "1h 30m",
    reportingTime: "9.15am",
    startTime: "9.45am",
    endTime: "11.15am",
  },
  {
    code: "0580/42",
    syllabus: "Mathematics",
    component: "Paper 42 Calculator (Extended)",
    examDate: "13-Feb-26",
    session: "AM",
    duration: "2h",
    reportingTime: "9.15am",
    startTime: "9.45am",
    endTime: "11.45am",
  },
];

// Parse date from string format to Date object
function parseExamDate(dateStr: string): Date {
  // Handle date ranges like "29 Jan 26 - 10 Feb 26"
  if (dateStr.includes("-") && dateStr.split("-").length > 2) {
    const firstDate = dateStr.split("-")[0].trim();
    return parseExamDate(firstDate);
  }

  // Handle "DD-MMM-YY" format like "09-Feb-26"
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const day = Number.parseInt(parts[0]);
    const monthMap: Record<string, number> = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const month = monthMap[parts[1]];
    const year = 2000 + Number.parseInt(parts[2]);
    return new Date(year, month, day);
  }

  // Handle "DD MMM YY" format like "29 Jan 26"
  const spaceparts = dateStr.trim().split(" ");
  if (spaceparts.length === 3) {
    const day = Number.parseInt(spaceparts[0]);
    const monthMap: Record<string, number> = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const month = monthMap[spaceparts[1]];
    const year = 2000 + Number.parseInt(spaceparts[2]);
    return new Date(year, month, day);
  }

  return new Date();
}

function getSessionClassName(session: string): string {
  if (session === "AM") {
    return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
  }
  if (session === "PM") {
    return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
  }
  return "bg-muted text-muted-foreground";
}

export function ExamTimetable() {
  const [papers, setPapers] = useState<Record<string, ExamPaper[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch papers from API
    fetch("/api/papers")
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
        setLoading(false);
      })
      .catch(() => {
        setPapers({});
        setLoading(false);
      });
  }, []);

  // Add sortDate to each exam entry and check if paper exists
  const timetableWithDates: ExamEntryWithDate[] = examTimetable.map((exam) => {
    // Search all subjects for matching papers
    let hasPaper = false;
    for (const subjectPapers of Object.values(papers)) {
      if (
        subjectPapers.some(
          (paper) =>
            exam.code.includes(paper.variant) ||
            paper.variant.includes(exam.code.split("/")[1])
        )
      ) {
        hasPaper = true;
        break;
      }
    }

    return {
      ...exam,
      sortDate: parseExamDate(exam.examDate),
      hasPaper,
    };
  });

  // Sort by date
  const sortedTimetable = timetableWithDates.toSorted(
    (a, b) => a.sortDate.getTime() - b.sortDate.getTime()
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-r from-card via-card to-primary/5 border-primary/10 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Exam Timetable
              </h2>
              <p className="text-sm text-muted-foreground">
                February - March 2026 Examination Schedule
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse text-muted-foreground">
                Loading timetable...
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-3 font-semibold text-foreground/70">
                        Code
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground/70">
                        Syllabus
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground/70">
                        Component
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground/70">
                        Exam Date
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground/70">
                        Duration
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground/70">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTimetable.map((exam, index) => (
                      <motion.tr
                        key={`${exam.code}-${exam.examDate}-${
                          exam.batch || index
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-3 font-mono text-xs text-primary">
                          {exam.code}
                        </td>
                        <td className="p-3">{exam.syllabus}</td>
                        <td className="p-3">
                          {exam.component}
                          {exam.batch && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {exam.batch}
                            </span>
                          )}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {exam.examDate}
                        </td>
                        <td className="p-3">{exam.duration}</td>
                        <td className="p-3">
                          {exam.hasPaper ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Available
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                              Not Added
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {sortedTimetable.map((exam, index) => (
                  <motion.div
                    key={`${exam.code}-${exam.examDate}-${exam.batch || index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 bg-gradient-to-br from-muted/40 to-muted/20 border border-border/50 rounded-xl space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-mono text-xs text-primary font-semibold">
                          {exam.code}
                        </p>
                        <p className="font-semibold text-sm mt-1">
                          {exam.syllabus}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exam.component}
                        </p>
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getSessionClassName(
                          exam.session
                        )}`}
                      >
                        {exam.session}
                      </span>
                    </div>

                    {exam.batch && (
                      <div className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        📋 {exam.batch}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-medium">{exam.examDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Duration
                        </p>
                        <p className="font-medium">{exam.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Reporting
                        </p>
                        <p className="font-medium">{exam.reportingTime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Start</p>
                        <p className="font-medium">{exam.startTime}</p>
                      </div>
                      {exam.startTime !== "-" && (
                        <div>
                          <p className="text-xs text-muted-foreground">End</p>
                          <p className="font-medium">{exam.endTime}</p>
                        </div>
                      )}
                    </div>

                    {exam.hasPaper ? (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Paper Available
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                        Not Added Yet
                      </div>
                    )}

                    {exam.fcsStart && exam.fcsEnd && (
                      <div className="pt-2 border-t border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">
                          Full Component Schedule
                        </p>
                        <p className="text-sm font-medium">
                          {exam.fcsStart} - {exam.fcsEnd}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </Card>

        {/* Legend */}
        <Card className="p-4 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400">
                AM
              </span>
              <span className="text-muted-foreground">Morning Session</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-orange-500/10 text-orange-600 dark:text-orange-400">
                PM
              </span>
              <span className="text-muted-foreground">Afternoon Session</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                FCS = Full Component Schedule
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

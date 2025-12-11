import { notFound } from "next/navigation";
import { subjects } from "@/lib/subjects";
import type { ExamPaper } from "@/lib/exam-papers";
import { SubjectDetailClient } from "@/components/subject-detail-client";
import { getSubjectConfig, detectPaperType } from "@/lib/subject-config";
import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export function generateStaticParams() {
  return subjects.map((subject) => ({
    subjectId: subject.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}): Promise<Metadata> {
  const { subjectId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    return {
      title: "Subject Not Found - StudyHub",
    };
  }

  return {
    title: `${subject.name} - StudyHub`,
    description: `${subject.description}. Access past papers and practice materials for ${subject.name}.`,
  };
}

export default async function SubjectDetailPage({
  params,
}: Readonly<{
  params: Promise<{ subjectId: string }>;
}>) {
  const { subjectId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);

  // Read papers from public JSON file
  const filePath = path.join(process.cwd(), "public", "exam-papers.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const examPapers: Record<string, ExamPaper[]> = JSON.parse(fileContent);
  const papers = examPapers[subjectId] || [];
  const config = getSubjectConfig(subjectId);

  if (!subject) {
    notFound();
  }

  // Group papers by year
  const papersByYear = papers.reduce((acc, paper) => {
    if (!acc[paper.year]) {
      acc[paper.year] = [];
    }
    acc[paper.year].push(paper);
    return acc;
  }, {} as Record<number, typeof papers>);

  // Group papers by type
  const papersByType: Record<
    string,
    { year: number; papers: typeof papers }[]
  > = {};

  if (config?.enableAutoSort) {
    // Group by paper type
    for (const paperType of config.paperTypes) {
      papersByType[paperType.id] = [];

      // Get all years
      const allYears = [...new Set(papers.map((p) => p.year))].sort(
        (a, b) => b - a
      );

      for (const year of allYears) {
        const yearPapers = papers.filter((p) => {
          if (p.year !== year) return false;
          const detectedType = detectPaperType(p.variant, config);
          return detectedType?.id === paperType.id;
        });

        if (yearPapers.length > 0) {
          const sortedPapers = yearPapers.toSorted((a, b) => {
            // Sort by session and variant
            return a.variant.localeCompare(b.variant);
          });
          papersByType[paperType.id].push({
            year,
            papers: sortedPapers,
          });
        }
      }
    }
  }

  const years = Object.keys(papersByYear)
    .map(Number)
    .sort((a, b) => b - a); // Sort descending

  return (
    <SubjectDetailClient
      subject={subject}
      papersByYear={papersByYear}
      papersByType={papersByType}
      years={years}
    />
  );
}

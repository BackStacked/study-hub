import { notFound } from "next/navigation";
import { subjects } from "@/lib/subjects";
import { examPapers } from "@/lib/exam-papers";
import { SubjectDetailClient } from "@/components/subject-detail-client";

export function generateStaticParams() {
  return subjects.map((subject) => ({
    subjectId: subject.id,
  }));
}

export default async function SubjectDetailPage({
  params,
}: Readonly<{
  params: Promise<{ subjectId: string }>;
}>) {
  const { subjectId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);
  const papers = examPapers[subjectId] || [];

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

  const years = Object.keys(papersByYear)
    .map(Number)
    .sort((a, b) => b - a); // Sort descending

  return (
    <SubjectDetailClient
      subject={subject}
      papersByYear={papersByYear}
      years={years}
    />
  );
}

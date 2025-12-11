// Exam papers data structure
export type ExamPaper = {
  year: number;
  session: string; // e.g., "May/June", "Oct/Nov"
  variant: string; // e.g., "Paper 42", "Paper 21", "Variant 1"
  paperNumber?: string; // e.g., "4", "2", "6" (extracted from variant)
  pdfUrl: string;
};

// Fetch exam papers from API
export async function getExamPapers(): Promise<Record<string, ExamPaper[]>> {
  try {
    const response = await fetch("/exam-papers.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch exam papers");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching exam papers:", error);
    return {};
  }
}

// Legacy export for backward compatibility - will be deprecated
export const examPapers: Record<string, ExamPaper[]> = {};

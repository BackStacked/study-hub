// Exam papers data structure
// You'll add actual PDF links later
export type ExamPaper = {
  year: number;
  session: string; // e.g., "May/June", "Oct/Nov"
  variant: string; // e.g., "Variant 1", "Variant 2"
  pdfUrl: string;
};

export const examPapers: Record<string, ExamPaper[]> = {
  esl: [
    // Example structure - you'll populate these later
    { year: 2023, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2023, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
    { year: 2021, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
  ],
  "physics-mcq": [
    { year: 2023, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2023, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
  ],
  "physics-theory": [
    { year: 2023, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2023, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
  ],
  "physics-atp": [
    { year: 2023, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2023, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
  ],
  "ict-1": [
    { year: 2023, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2023, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
  ],
  "ict-2": [
    { year: 2023, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2023, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
  ],
  "ict-3": [
    { year: 2023, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2023, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
  ],
  "maths-calculator": [
    { year: 2023, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2023, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
  ],
  "maths-non-calculator": [
    { year: 2023, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
    { year: 2023, session: "Oct/Nov", variant: "Variant 1", pdfUrl: "#" },
    { year: 2022, session: "May/June", variant: "Variant 1", pdfUrl: "#" },
  ],
};

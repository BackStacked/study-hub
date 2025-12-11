// Subject configuration for organizing exam papers by type
export type PaperType = {
  id: string;
  name: string;
  pattern: RegExp; // Pattern to match paper names (e.g., /Paper 4/, /4\d/)
  order: number; // Display order
  description?: string;
};

export type SubjectConfig = {
  subjectId: string;
  paperTypes: PaperType[];
  enableAutoSort: boolean; // Auto-sort papers by type
  defaultView: "year" | "type"; // Default grouping view
};

// Configuration for each subject
export const subjectConfigs: Record<string, SubjectConfig> = {
  "physics-mcq": {
    subjectId: "physics-mcq",
    enableAutoSort: true,
    defaultView: "type",
    paperTypes: [
      {
        id: "paper-2",
        name: "Paper 2 - Multiple Choice",
        pattern: /(?:Paper\s*2|2\d|P2)/i,
        order: 1,
        description: "Multiple Choice Questions",
      },
    ],
  },
  "physics-theory": {
    subjectId: "physics-theory",
    enableAutoSort: true,
    defaultView: "type",
    paperTypes: [
      {
        id: "paper-4",
        name: "Paper 4 - Theory",
        pattern: /(?:Paper\s*4|4\d|P4)/i,
        order: 1,
        description: "Structured Questions",
      },
    ],
  },
  "physics-atp": {
    subjectId: "physics-atp",
    enableAutoSort: true,
    defaultView: "type",
    paperTypes: [
      {
        id: "paper-6",
        name: "Paper 6 - ATP",
        pattern: /(?:Paper\s*6|6\d|P6)/i,
        order: 1,
        description: "Alternative to Practical",
      },
    ],
  },
  esl: {
    subjectId: "esl",
    enableAutoSort: true,
    defaultView: "type",
    paperTypes: [
      {
        id: "paper-1",
        name: "Paper 1 - Reading",
        pattern: /(?:Paper\s*1|1\d|P1)/i,
        order: 1,
      },
      {
        id: "paper-2",
        name: "Paper 2 - Writing",
        pattern: /(?:Paper\s*2|2\d|P2)/i,
        order: 2,
      },
      {
        id: "paper-3",
        name: "Paper 3 - Listening",
        pattern: /(?:Paper\s*3|3\d|P3)/i,
        order: 3,
      },
      {
        id: "paper-4",
        name: "Paper 4 - Speaking",
        pattern: /(?:Paper\s*4|4\d|P4)/i,
        order: 4,
      },
    ],
  },
  "ict-1": {
    subjectId: "ict-1",
    enableAutoSort: true,
    defaultView: "type",
    paperTypes: [
      {
        id: "paper-1",
        name: "Paper 1 - Theory",
        pattern: /(?:Paper\s*1|1\d|P1)/i,
        order: 1,
      },
    ],
  },
  "ict-2": {
    subjectId: "ict-2",
    enableAutoSort: true,
    defaultView: "type",
    paperTypes: [
      {
        id: "paper-2",
        name: "Paper 2 - Practical",
        pattern: /(?:Paper\s*2|2\d|P2)/i,
        order: 1,
      },
    ],
  },
  "ict-3": {
    subjectId: "ict-3",
    enableAutoSort: true,
    defaultView: "type",
    paperTypes: [
      {
        id: "paper-3",
        name: "Paper 3 - Advanced Theory",
        pattern: /(?:Paper\s*3|3\d|P3)/i,
        order: 1,
      },
    ],
  },
  "maths-calculator": {
    subjectId: "maths-calculator",
    enableAutoSort: true,
    defaultView: "type",
    paperTypes: [
      {
        id: "paper-2",
        name: "Paper 2 - Extended (Calculator)",
        pattern: /(?:Paper\s*2|2\d|P2)/i,
        order: 1,
      },
      {
        id: "paper-4",
        name: "Paper 4 - Extended (Calculator)",
        pattern: /(?:Paper\s*4|4\d|P4)/i,
        order: 2,
      },
    ],
  },
  "maths-non-calculator": {
    subjectId: "maths-non-calculator",
    enableAutoSort: true,
    defaultView: "type",
    paperTypes: [
      {
        id: "paper-1",
        name: "Paper 1 - Core (Non-Calculator)",
        pattern: /(?:Paper\s*1|1\d|P1)/i,
        order: 1,
      },
      {
        id: "paper-3",
        name: "Paper 3 - Core (Non-Calculator)",
        pattern: /(?:Paper\s*3|3\d|P3)/i,
        order: 2,
      },
    ],
  },
};

// Helper function to get config for a subject
export function getSubjectConfig(subjectId: string): SubjectConfig | null {
  return subjectConfigs[subjectId] || null;
}

// Helper function to detect paper type from variant string
export function detectPaperType(
  variant: string,
  config: SubjectConfig
): PaperType | null {
  for (const paperType of config.paperTypes) {
    if (paperType.pattern.test(variant)) {
      return paperType;
    }
  }
  return null;
}

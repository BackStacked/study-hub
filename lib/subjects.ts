export const subjects = [
  {
    id: "esl",
    name: "ESL",
    description: "English as a Second Language",
    icon: "📚",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "physics-mcq",
    name: "Physics MCQ",
    description: "Multiple Choice Questions",
    icon: "⚛️",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "physics-theory",
    name: "Physics Theory",
    description: "Theoretical Physics",
    icon: "🔬",
    color: "from-indigo-500/20 to-purple-500/20",
  },
  {
    id: "physics-atp",
    name: "Physics ATP",
    description: "Alternative to Practical",
    icon: "🧪",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: "ict-1",
    name: "ICT I",
    description: "Information & Communication Technology - Part 1",
    icon: "💻",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "ict-2",
    name: "ICT II",
    description: "Information & Communication Technology - Part 2",
    icon: "🖥️",
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    id: "ict-3",
    name: "ICT III",
    description: "Information & Communication Technology - Part 3",
    icon: "⌨️",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "maths-calculator",
    name: "Maths Calculator",
    description: "Mathematics with Calculator",
    icon: "🔢",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: "maths-non-calculator",
    name: "Maths Non-Calculator",
    description: "Mathematics without Calculator",
    icon: "📐",
    color: "from-red-500/20 to-pink-500/20",
  },
];

export type Subject = (typeof subjects)[number];

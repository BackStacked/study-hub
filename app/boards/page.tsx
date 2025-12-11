"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function BoardsPage() {
  const boards = [
    {
      name: "Cambridge IGCSE",
      description: "International General Certificate of Secondary Education",
      icon: "🎓",
      website:
        "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse/",
    },
    {
      name: "Cambridge O Level",
      description: "Cambridge Ordinary Level",
      icon: "📖",
      website:
        "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-o-level/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Exam Boards
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Information about your examination boards
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {boards.map((board, index) => (
            <motion.a
              key={board.name}
              href={board.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2 + 0.5,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-8 h-full transition-all duration-300 hover:shadow-xl border-2 hover:border-primary/50 group">
                <div className="space-y-4">
                  <motion.div
                    className="text-6xl mb-3"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {board.icon}
                  </motion.div>
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {board.name}
                  </h2>
                  <p className="text-muted-foreground">{board.description}</p>
                  <div className="pt-2 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit Website
                    <svg
                      className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </motion.a>
          ))}
        </div>

        {/* Resources Section */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            Helpful Resources
          </motion.h2>

          <div className="grid gap-4">
            {[
              {
                icon: "📚",
                title: "Syllabus Documents",
                desc: "Access official syllabus documents for all your subjects to understand exam requirements and content.",
              },
              {
                icon: "✍️",
                title: "Mark Schemes",
                desc: "Review mark schemes to understand how examiners award marks and what they're looking for in answers.",
              },
              {
                icon: "📊",
                title: "Examiner Reports",
                desc: "Learn from examiner reports to identify common mistakes and areas where students typically lose marks.",
              },
              {
                icon: "💡",
                title: "Grade Thresholds",
                desc: "Check grade thresholds from previous years to understand the marks needed for each grade.",
              },
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-3xl">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {resource.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

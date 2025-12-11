import { PaperManager } from "@/components/paper-manager";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paper Manager - StudyHub",
  description: "Add, edit, or remove exam papers from your collection",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-primary/5">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Paper Manager
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">
                  Organize and manage your exam paper collection
                </p>
              </div>
            </div>
          </div>
          <PaperManager />
        </div>
      </div>
    </div>
  );
}

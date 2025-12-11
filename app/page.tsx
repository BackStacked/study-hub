import { CountdownTimer } from "@/components/countdown-timer";
import { ExamTimetable } from "@/components/exam-timetable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - StudyHub",
  description:
    "Your comprehensive exam preparation platform with countdown timer to January 29, 2026",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-20 space-y-12">
        <CountdownTimer />
        <ExamTimetable />
      </div>
    </div>
  );
}

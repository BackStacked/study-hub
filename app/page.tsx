import { CountdownTimer } from "@/components/countdown-timer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-20">
        <CountdownTimer />
      </div>
    </div>
  );
}

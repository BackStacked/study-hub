# StudyHub - Exam Preparation Platform

A modern, immersive study website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Home Page**: Countdown timer to exam date (January 29, 2026)
- **Subjects Page**: Access 9 different subjects:
  - ESL (English as a Second Language)
  - Physics MCQ
  - Physics Theory
  - Physics ATP
  - ICT I, II, III
  - Maths Calculator
  - Maths Non-Calculator
- **Subject Detail Pages**: Year-wise organized past exam papers
- **Boards Page**: Information about exam boards and resources
- **Modern Design**: Simplistic, clean interface with smooth animations
- **Responsive**: Works on all devices

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding Exam Papers

To add actual exam papers to your subjects:

1. Open `lib/exam-papers.ts`
2. For each subject, update the PDF URLs:

```typescript
"esl": [
  {
    year: 2023,
    session: "May/June",
    variant: "Variant 1",
    pdfUrl: "https://your-pdf-url.com/paper.pdf"
  },
  // Add more papers...
],
```

### Finding Past Papers

You can find past papers from:

- [Cambridge International Past Papers](https://www.cambridgeinternational.org/exam-administration/cambridge-exams-officers-guide/phase-1-preparation/past-papers/)
- [GCE Guide](https://www.gceguide.com/)
- [Save My Exams](https://www.savemyexams.com/)
- [Physics & Maths Tutor](https://www.physicsandmathstutor.com/)

## Customization

### Change Exam Date

Edit `components/countdown-timer.tsx` and update the exam date:

```typescript
const examDate = new Date("2026-01-29T00:00:00");
```

### Add More Subjects

Edit `lib/subjects.ts` and add new subjects to the array.

### Modify Colors

Update `app/globals.css` to change the color scheme.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Fonts**: Inter, Geist Sans, Geist Mono

## Project Structure

```
my-app/
├── app/
│   ├── page.tsx              # Home page with countdown
│   ├── layout.tsx            # Root layout with navigation
│   ├── globals.css           # Global styles
│   ├── subjects/
│   │   ├── page.tsx          # Subjects grid
│   │   └── [subjectId]/
│   │       └── page.tsx      # Individual subject page
│   └── boards/
│       └── page.tsx          # Exam boards page
├── components/
│   ├── navigation.tsx        # Top navigation bar
│   ├── countdown-timer.tsx   # Countdown component
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── subjects.ts           # Subjects data
│   ├── exam-papers.ts        # Exam papers data
│   └── utils.ts              # Utility functions
└── public/                   # Static files
```

## License

Built for personal study purposes.

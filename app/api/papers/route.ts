import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const PAPERS_FILE = path.join(process.cwd(), "public", "exam-papers.json");

// Ensure the file exists
async function ensureFileExists() {
  try {
    await fs.access(PAPERS_FILE);
  } catch {
    // File doesn't exist, create it with empty object
    await fs.mkdir(path.dirname(PAPERS_FILE), { recursive: true });
    await fs.writeFile(PAPERS_FILE, JSON.stringify({}, null, 2), "utf-8");
  }
}

// GET - Fetch all exam papers
export async function GET() {
  try {
    await ensureFileExists();
    const fileContent = await fs.readFile(PAPERS_FILE, "utf-8");
    const papers = JSON.parse(fileContent);
    return NextResponse.json(papers);
  } catch (error) {
    console.error("Error reading papers:", error);
    return NextResponse.json(
      { error: "Failed to read exam papers" },
      { status: 500 }
    );
  }
}

// POST - Update all exam papers
export async function POST(request: Request) {
  try {
    await ensureFileExists();
    const papers = await request.json();
    await fs.writeFile(PAPERS_FILE, JSON.stringify(papers, null, 2), "utf-8");
    return NextResponse.json({
      success: true,
      message: "Papers updated successfully",
    });
  } catch (error) {
    console.error("Error updating papers:", error);
    return NextResponse.json(
      { error: "Failed to update exam papers" },
      { status: 500 }
    );
  }
}

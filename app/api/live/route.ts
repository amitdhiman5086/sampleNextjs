import { NextResponse } from "next/server";
import { getLiveTodo } from "@/lib/todo";

export async function GET() {
  const result = await getLiveTodo();
  return NextResponse.json(result);
}

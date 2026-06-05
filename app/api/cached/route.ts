import { NextResponse } from "next/server";
import { getCachedTodo } from "@/lib/todo";

export async function GET() {
  const result = await getCachedTodo();
  return NextResponse.json(result);
}

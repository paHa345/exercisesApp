import { NextRequest, NextResponse } from "next/server";

export async function handler(req: NextRequest, res: NextResponse) {
  return Response.json({ message: "Success" });
}

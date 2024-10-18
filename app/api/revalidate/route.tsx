import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const path = request.nextUrl.searchParams.get("path") || "/";
    console.log(path);
    revalidatePath(path);
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "Missing path to revalidate",
    });
  }
}

import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const path = request.nextUrl.searchParams.get("path") || "/";
    console.log(path);
    revalidatePath("/catalog/66582fb1b825f8f115bc936e");
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "Missing path to revalidate",
    });
  }
}

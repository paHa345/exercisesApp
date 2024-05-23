import { connectMongoDB } from "@/app/libs/MongoConnect";
import User from "@/app/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const sortParameter = req.nextUrl.searchParams.get("filter");
    const sortOrder = req.nextUrl.searchParams.get("increment") === "true" ? 1 : (-1 as 1 | -1);
    const sortQuery = { [sortParameter as string]: sortOrder };

    console.log(req.nextUrl);

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "3", 10);
    const skip = (page - 1) * limit;

    const coaches = await User.aggregate([
      { $match: { userType: "coach" } },
      { $project: { email: 1, name: 1 } },
      { $sort: sortQuery },
      { $skip: skip },
      { $limit: limit },
    ]);
    console.log(coaches);
    return NextResponse.json({ message: "Success", result: coaches });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}

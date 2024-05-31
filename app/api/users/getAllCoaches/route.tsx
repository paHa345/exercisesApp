import { connectMongoDB } from "@/app/libs/MongoConnect";
import User from "@/app/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const sortParameter = req.nextUrl.searchParams.get("filter");
    const sortOrder = req.nextUrl.searchParams.get("increment") === "true" ? 1 : (-1 as 1 | -1);
    const sortQuery = { [sortParameter as string]: sortOrder };

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "1", 10);
    const skip = (page - 1) * limit;

    const allCoaches = await User.countDocuments({ userType: "coach" });

    const currentCoaches =
      sortParameter === "workoutsArr"
        ? await User.aggregate([
            { $match: { userType: "coach" } },
            {
              $project: {
                email: 1,
                name: 1,
                studentsArr: 1,
                workoutsCount: { $size: `$${sortParameter}` },
              },
            },
            { $sort: { workoutsCount: sortOrder } },
            { $skip: skip },
            { $limit: limit },
          ])
        : await User.aggregate([
            { $match: { userType: "coach" } },
            {
              $project: {
                email: 1,
                name: 1,
                studentsArr: 1,
                workoutsCount: { $size: `$workoutsArr` },
              },
            },
            { $sort: sortQuery },
            { $skip: skip },
            { $limit: limit },
          ]);

    // const currentCoaches = await User.aggregate([
    //   { $match: { userType: "coach" } },
    //   { $project: { email: 1, name: 1, studentsArr: 1, workoutsArr: 1 } },
    //   { $sort: sortQuery },
    //   { $skip: skip },
    //   { $limit: limit },
    // ]);

    // const currentCoaches = await User.aggregate([
    //   { $match: { userType: "coach" } },
    //   {
    //     $project: {
    //       email: 1,
    //       name: 1,
    //       studentsArr: 1,
    //       workoutsCount: { $size: `$${sortParameter}` },
    //     },
    //   },
    //   { $sort: { workoutsCount: sortOrder } },
    //   { $skip: skip },
    //   { $limit: limit },
    // ]);

    return NextResponse.json({
      message: "Success",
      result: currentCoaches,
      allCoachesCount: allCoaches,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}

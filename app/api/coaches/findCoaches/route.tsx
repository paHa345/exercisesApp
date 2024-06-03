import { connectMongoDB } from "@/app/libs/MongoConnect";
import Exercise from "@/app/models/ExerciseModel";
import User from "@/app/models/UserModel";
import { authOptions } from "@/app/utils/authOptions";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }
  const searchQuery = req.nextUrl.searchParams.get("query");
  if (searchQuery!.length < 3) {
    return NextResponse.json(
      { message: "Слишком короткий поисковый запрос. Запрос должен быть более 2 символов" },
      { status: 415 }
    );
  }
  try {
    await connectMongoDB();

    const sortParameter = req.nextUrl.searchParams.get("filter");
    const sortOrder = req.nextUrl.searchParams.get("increment") === "true" ? 1 : (-1 as 1 | -1);
    const sortQuery = { [sortParameter as string]: sortOrder };

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "3", 10);
    const skip = (page - 1) * limit;

    const currentUser = await User.findOne({ email: session?.user?.email });

    const searchExercisesQuantity = await Exercise.countDocuments({
      $and: [
        { name: { $regex: `(${searchQuery})`, $options: "i" } },
        { $or: [{ createdUserId: String(currentUser?._id) }, { isBest: true }] },
      ],
    });

    const allExercises = await Exercise.aggregate([
      {
        $match: {
          $and: [
            { name: { $regex: `(${searchQuery})`, $options: "i" } },
            { $or: [{ createdUserId: String(currentUser?._id) }, { isBest: true }] },
          ],
        },
      },
      { $sort: sortQuery },
      { $skip: skip },
      { $limit: limit },
    ]);

    return NextResponse.json({
      message: "Success",
      result: allExercises,
      quantity: searchExercisesQuantity,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}

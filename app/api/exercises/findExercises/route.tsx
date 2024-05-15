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
  console.log(searchQuery);
  if (searchQuery!.length < 3) {
    return NextResponse.json(
      { message: "Слишком короткий поисковый запрос. Запрос должен быть более 2 символов" },
      { status: 415 }
    );
  }
  try {
    await connectMongoDB();

    const page = parseInt(req.nextUrl.searchParams.get("page") || "2", 10);
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
      { $skip: skip },
      { $limit: limit },
    ]);

    // const allExercises = await Exercise.aggregate([
    //   {
    //     $match: {
    //       $and: [
    //         { $or: [{ isBest: true }, { createdUserId: currentUser?._id }] },
    //         {
    //           $expr: {
    //             $regexMatch: {
    //               input: { $toLower: "$name" },
    //               regex: sortParameter!.trim(),
    //               options: "i",
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ]);
    // const response = NextResponse.json({ message: "Success", result: allExercises });
    // response.headers.set("Cache-Control", "no-store");
    return NextResponse.json({
      message: "Success",
      result: allExercises,
      quantity: searchExercisesQuantity,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}

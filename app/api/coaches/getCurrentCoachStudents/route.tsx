import { connectMongoDB } from "@/app/libs/MongoConnect";
import User from "@/app/models/UserModel";
import { IUser } from "@/app/types";
import { authOptions } from "@/app/utils/authOptions";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    if (session?.user.userType !== "coach") {
      throw new Error("Только для тренеров");
    }

    interface CurrentCoachInterface {
      _id: string;
      studentsArr: IUser[];
    }

    const currentCoach: CurrentCoachInterface | null = (await User.findOne(
      { email: session.user.email },
      "studentsArr"
    )) as CurrentCoachInterface | null;

    const testCoach = await mongoose.model("User").aggregate([
      { $match: { email: session.user.email } },
      {
        $unwind: {
          path: "$studentsArr",
        },
      },
      {
        $lookup: {
          from: "exercisesAppUsers",
          localField: "studentsArr.studentId",
          foreignField: "_id",
          as: "studentsArr.studentId",
        },
      },
      {
        $unwind: {
          path: "$studentsArr.studentId",
        },
      },
      {
        $project: {
          "studentsArr.studentId._id": 1,
          "studentsArr.studentId.name": 1,
          "studentsArr.studentId.email": 1,
          "studentsArr.addRequestId": 1,
        },
      },
    ]);
    console.log(testCoach);

    if (currentCoach === null) {
      throw new Error("Тренер не найден");
    }

    return NextResponse.json({ message: "Success", result: testCoach });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

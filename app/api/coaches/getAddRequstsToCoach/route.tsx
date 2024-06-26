import { connectMongoDB } from "@/app/libs/MongoConnect";
import AddToCoachRequest from "@/app/models/AddToCoachRequestModel";
import User from "@/app/models/UserModel";
import { authOptions } from "@/app/utils/authOptions";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    const currentCoach = await mongoose
      .model("User")
      .findOne({ email: session.user.email }, { userType: 1, requestToCoach: 1 })
      .populate({
        path: "requestToCoach",
        model: "AddToCoachRequest",
        populate: {
          path: "userId",
          model: "User",
          select: "name email",
        },
      });

    const filteredReq = currentCoach.requestToCoach.filter((req: any) => req.active);

    if (currentCoach.userType !== "coach") {
      throw new Error("Только для тренеров");
    }
    return NextResponse.json({ message: "Success", result: filteredReq });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

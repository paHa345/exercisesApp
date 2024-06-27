import { connectMongoDB } from "@/app/libs/MongoConnect";
import AddToCoachRequest from "@/app/models/AddToCoachRequestModel";
import User from "@/app/models/UserModel";
import { IAddToStudentsReq } from "@/app/types";
import { authOptions } from "@/app/utils/authOptions";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Только для зарегистрированных пользователей" },
        { status: 401 }
      );
    }
    await connectMongoDB();
    const body = await req.json();

    const currentUser = await User.findOne(
      { email: session.user.email },
      { email: 1, name: 1, userType: 1 }
    );

    const currentConfirmRequest = await AddToCoachRequest.findOne({
      _id: body.addToCoachRequestId,
    }).populate({
      path: "coachId",
      model: "User",
      select: "name, email",
    });

    if (!currentConfirmRequest) {
      throw new Error("Запрос не найден");
    }

    if (currentUser.userType !== "coach") {
      throw new Error("Недопустимо для данного пользователя");
    }

    if (String(currentUser._id) !== String(currentConfirmRequest.coachId._id)) {
      throw new Error("Недопустимо для данного пользователя");
    }

    // if (!currentConfirmRequest?.active) {
    //   throw new Error("Недопустимо для данного запроса. Уже принят тренером");
    // }

    console.log(currentConfirmRequest?.rejectedByCoach);

    if (currentConfirmRequest?.rejectedByCoach === true) {
      throw new Error("Недопустимо для данного запроса. Уже отклонён тренером");
    }

    const rejectedByCoachRequest = await mongoose.model("AddToCoachRequest").findByIdAndUpdate(
      {
        _id: body.addToCoachRequestId,
      },
      {
        rejectedByCoach: true,
      }
    );

    return NextResponse.json(
      { message: "Success", result: rejectedByCoachRequest },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}

import { connectMongoDB } from "@/app/libs/MongoConnect";
import AddToCoachRequest from "@/app/models/AddToCoachRequestModel";
import { IAddToCoachRequstSchema } from "@/app/types";
import { authOptions } from "@/app/utils/authOptions";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "ТОлько для зарегистрированных пользователей" },
      { status: 400 }
    );
  }
  try {
    const body = await req.json();
    console.log(body.addToCoachRequestId);
    await connectMongoDB();
    const addToCoachRequest: IAddToCoachRequstSchema | null = await AddToCoachRequest.findOne({
      _id: body.addToCoachRequestId,
    });
    if (addToCoachRequest === null) {
      throw new Error("Недопустимо для данного запроса. Запрос не найден");
    }

    if (addToCoachRequest.active) {
      throw new Error("Недопустимо для данного запроса. Действие доступно только тренеру");
    }

    const currentCoach = await mongoose
      .model("User")
      .findOne(
        { email: session.user.email },
        { userType: 1, coachesArr: 1, studentsArr: 1, addToStudentsRequests: 1 }
      );

    if (currentCoach === null || currentCoach.userType !== "coach") {
      throw new Error("Недопустимо для данного запроса. Действие доступно только тренеру");
    }

    // const studentFromRequest = await mongoose.model("User").findById(addToCoachRequest.userId, {
    //   userType: 1,
    //   coachesArr: 1,
    //   studentsArr: 1,
    //   addToStudentsRequests: 1,
    // });

    if (String(currentCoach._id) !== String(addToCoachRequest.coachId)) {
      throw new Error("Недопустимо для данного запроса. Несоответствие данных пользователя");
    }

    const deletedRequest = await mongoose
      .model("AddToCoachRequest")
      .deleteOne({ _id: body.addToCoachRequestId });

    return NextResponse.json(
      { message: "Ученик успешно удалён из вашего списка" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

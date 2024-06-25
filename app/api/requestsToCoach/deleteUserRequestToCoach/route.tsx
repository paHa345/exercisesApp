import { connectMongoDB } from "@/app/libs/MongoConnect";
import { authOptions } from "@/app/utils/authOptions";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 400 }
    );
  }
  try {
    const body = await req.json();
    console.log(body);
    await connectMongoDB();
    const currentUser = await mongoose.model("User").findOne({ email: session.user.email });
    const addToCoachRequest = await mongoose
      .model("AddToCoachRequest")
      .findById(body.addToCoachRequestId);
    console.log(addToCoachRequest);

    if (addToCoachRequest === null) {
      throw new Error("Недопустимо для данного запроса. Запрос не найден");
    }

    if (String(addToCoachRequest.userId) !== String(currentUser._id)) {
      throw new Error("Недопустимо для данного запроса. Пользователь не найден");
    }

    const deletedRequest = await mongoose.model("AddToCoachRequest").deleteOne({
      _id: body.addToCoachRequestId,
    });
    return NextResponse.json(
      { message: "Зпрос успешно удалён", result: deletedRequest },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

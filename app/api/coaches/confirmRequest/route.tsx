import { connectMongoDB } from "@/app/libs/MongoConnect";
import AddToCoachRequest from "@/app/models/AddToCoachRequestModel";
import User from "@/app/models/UserModel";
import { authOptions } from "@/app/utils/authOptions";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    const body: { addToCoachRequestId: string } = await req.json();

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

    if (!currentConfirmRequest.active) {
      throw new Error("Недопустимо для данного запроса");
    }

    const currentConfirmRequestUpdated = await AddToCoachRequest.findByIdAndUpdate(
      {
        _id: body.addToCoachRequestId,
      },
      { active: false }
    );

    // console.log(currentConfirmRequest);

    return NextResponse.json({ message: "Success", result: currentConfirmRequestUpdated });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

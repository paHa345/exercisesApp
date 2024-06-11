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

    const currentUser = await User.findOne({ email: session.user.email });
    console.log(currentUser);

    const currentConfirmRequest = await AddToCoachRequest.findByIdAndUpdate(
      {
        _id: body.addToCoachRequestId,
      },
      {}
    );

    console.log(currentConfirmRequest);

    if (!currentConfirmRequest) {
      throw new Error("Не найден запрос на добавление");
    }

    return NextResponse.json({ message: "Test message" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

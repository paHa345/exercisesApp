import { connectMongoDB } from "@/app/libs/MongoConnect";
import User from "@/app/models/UserModel";
import { authOptions } from "@/app/utils/authOptions";
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
    const currentCoach = await User.findOne(
      { email: session.user.email },
      { userType: 1, addToStudentsRequests: 1 }
    ).populate({
      path: "addToStudentsRequests",
      populate: {
        path: "userId",
        model: "User",
        select: "name email",
      },
    });

    if (currentCoach.userType !== "coach") {
      throw new Error("Только для тренеров");
    }
    return NextResponse.json({ message: "Success", result: currentCoach.addToStudentsRequests });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

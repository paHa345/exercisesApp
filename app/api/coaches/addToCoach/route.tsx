import { connectMongoDB } from "@/app/libs/MongoConnect";
import User from "@/app/models/UserModel";
import { IUser, UserType } from "@/app/types";
import { authOptions } from "@/app/utils/authOptions";
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
    const body = await req.json();
    console.log(body.coachId);
    const currentUser: IUser | null = await User.findOne(
      { email: session.user?.email },
      { userType: 1 }
    );
    if (currentUser?.userType !== "user") {
      throw new Error("Только для пользователей в статусе user");
    }

    const currentCoach: IUser | null = await User.findById(body.coachId, {
      name: 1,
      addToStudentsRequests: 1,
    });
    if (String(currentCoach?._id) !== String(body.coachId)) {
      throw new Error("Не найден данный тренер");
    }

    console.log(currentCoach);

    currentCoach?.addToStudentsRequests?.forEach((request) => {
      if (String(request.userId) === String(currentUser._id)) {
        throw new Error("Запрос на добавление уже отправлен");
      }
    });

    const updatedCoach = await User.findByIdAndUpdate(body.coachId, {
      $push: {
        addToStudentsRequests: {
          userId: currentUser._id,
          active: true,
        },
      },
    });

    return NextResponse.json({
      message: "Success",
      result: updatedCoach,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}

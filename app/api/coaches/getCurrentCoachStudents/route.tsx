import { connectMongoDB } from "@/app/libs/MongoConnect";
import User from "@/app/models/UserModel";
import { IUser } from "@/app/types";
import { authOptions } from "@/app/utils/authOptions";
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
    ).populate({
      path: "studentsArr",
      model: "User",
      select: "name email",
    })) as CurrentCoachInterface | null;

    if (currentCoach === null) {
      throw new Error("Тренер не найден");
    }

    return NextResponse.json({ message: "Success", result: currentCoach.studentsArr });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

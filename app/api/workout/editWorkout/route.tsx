import { connectMongoDB } from "@/app/libs/MongoConnect";
import User from "@/app/models/UserModel";
import Workout from "@/app/models/WorkoutModel";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.email);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    const body = await req.json();

    const currentUser = await User.findOne({ email: session?.user?.email });

    const inStudentsArr = body.studentsIdArr.some((studentObj: any) => {
      return studentObj.email === currentUser.email;
    });

    if (String(currentUser._id) !== String(body.userId) && !inStudentsArr) {
      throw new Error("Нет прав для редактирования данного упражнения");
    }

    const editedWorkout = await Workout.findOneAndReplace({ _id: body._id }, body);

    return NextResponse.json({ message: "sucess", result: editedWorkout });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}

import { editExerciseRevalidateServerAction } from "@/actions/editExercise";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import Exercise from "@/app/models/ExerciseModel";
import User from "@/app/models/UserModel";
import Workout from "@/app/models/WorkoutModel";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest) {
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
    console.log(body);

    const currentUser = await User.findOne({ email: session?.user?.email });

    if (String(currentUser._id) !== String(body.createdUserId)) {
      throw new Error("Нет прав для редактирования данного упражнения");
    }

    const editedExercise = await Exercise.findOneAndReplace({ _id: body._id }, body);
    console.log(String(body._id));
    const path = req.nextUrl.origin;

    console.log(`${path}/catalog/${String(body._id)}`);
    // editExerciseRevalidateServerAction(String(body._id));
    revalidatePath(`/catalog/${String(body._id)}`);

    return NextResponse.json({ message: "sucess", result: editedExercise });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import Workout from "@/app/models/WorkoutModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import User from "@/app/models/UserModel";
import { IComment, IUser, IWorkout } from "@/app/types";
import Comment from "@/app/models/CommentModel";

export async function GET(req: NextRequest, { params }: { params: { reviewId: string } }) {
  //   const currentId = new ObjectId(String(req.query.exerciseId));

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    const review = await Comment.findById(params?.reviewId).populate({
      path: "userId",
      model: "User",
      select: "email name",
    });
    return NextResponse.json({ message: "Success", result: review });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { reviewId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    const currentUser: IUser | null = await User.findOne({ email: session.user?.email });
    const currentReview: IComment | null = await Comment.findById(params?.reviewId);

    console.log("Current review", currentReview?.userId);

    if (String(currentReview?.userId) !== String(currentUser?._id)) {
      throw new Error("У вас нет прав для удаления этого комментария");
    }
    const review: any = await Comment.findByIdAndDelete(params?.reviewId);
    if (!review) {
      return NextResponse.json({ message: "Комментарий не найден" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", result: review });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

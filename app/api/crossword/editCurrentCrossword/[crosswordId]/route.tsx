import { connectMongoDB } from "@/app/libs/MongoConnect";
import Comment from "@/app/models/CommentModel";
import Crossword from "@/app/models/CrosswordModel";
import User from "@/app/models/UserModel";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { crosswordId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }
  if (req.method !== "PATCH") {
    return NextResponse.json({ message: "Для данного url только PATCH запросы" }, { status: 400 });
  }
  try {
    await connectMongoDB();
    const body = await req.json();
    // console.log(body);

    const currentUser = await User.findOne({ email: session.user?.email }).select("_id");
    const currentCrosswordCreatedUserId = await Crossword.findById(params.crosswordId).select(
      "userId"
    );

    console.log(currentUser._id);
    console.log(currentCrosswordCreatedUserId.userId);

    if (String(currentUser._id) !== String(currentCrosswordCreatedUserId.userId)) {
      throw new Error("Недопустимо для данного пользователя");
    }

    // body.userId = String(currentUser._id);
    // body.changeDate = Date.now();
    // console.log("Save");
    console.log(body.questionArr);

    const editedCrossword = await Crossword.findByIdAndUpdate(params.crosswordId, {
      name: body.name,
      changeDate: Date.now(),
      isCompleted: body.isCompleted,
      questionsArr: body.questionsArr,
      crosswordObj: body.crosswordObj,
    });

    return NextResponse.json({ message: "Success", result: editedCrossword });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
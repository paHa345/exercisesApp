import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import Workout from "@/app/models/WorkoutModel";
import User from "@/app/models/UserModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  // console.log(`User from API: ${session?.user?.userType}`);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();

    const currentUser = await User.findOne({ email: session?.user?.email }, { workoutsArr: 1 })
      .populate({
        path: "workoutsArr",
        populate: {
          path: "exercisesArr",
          populate: [
            {
              path: "exercise",
              model: "Exercise",
              select: "id name",
            },
          ],
        },
      })
      .populate({
        path: "workoutsArr",
        populate: [
          {
            path: "studentsIdArr",
            model: "User",
            select: "id name email",
          },
        ],
      });

    const userWorkouts = await User.findOne({ email: session?.user?.email }, { coachesArr: 1 })
      .populate({
        path: "coachesArr.coachId",
        model: "User",
        select: "coachId",
        populate: {
          path: "workoutsArr",
          populate: {
            path: "exercisesArr",
            populate: [
              {
                path: "exercise",
                model: "Exercise",
                select: "id name",
              },
            ],
          },
        },
      })
      .populate({
        path: "coachesArr.coachId",
        model: "User",
        select: "coachId",
        populate: {
          path: "workoutsArr",
          populate: [
            {
              path: "studentsIdArr",
              model: "User",
              select: "id name email",
            },
          ],
        },
      })
      .populate({
        path: "coachesArr.coachId",
        model: "User",
        select: "coachId",
        populate: {
          path: "workoutsArr",
          populate: [
            {
              path: "userId",
              model: "User",
              select: "id name email",
            },
          ],
        },
      });

    const userWorkoutsFromCoach = userWorkouts.coachesArr
      .flatMap((user: any) => {
        return user.coachId.workoutsArr.map((workouts: any) => workouts);
      })
      .filter((workout: any) => {
        return workout.studentsIdArr.some(
          (student: any) => student.email.toString() === session?.user?.email
        );
      });

    const currentWorkouts =
      session?.user?.userType === "user" ? userWorkoutsFromCoach : currentUser.workoutsArr;

    return NextResponse.json({ message: "Success", result: currentWorkouts });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}

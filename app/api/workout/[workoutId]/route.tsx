import { NextRequest, NextResponse } from "next/server";
import Workout from "@/app/models/WorkoutModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";

export async function GET(req: NextRequest, { params }: { params: { workoutId: string } }) {
  //   const currentId = new ObjectId(String(req.query.exerciseId));

  try {
    await connectMongoDB();
    const workout = await Workout.findById(params.workoutId);
    console.log(workout);
    return NextResponse.json({ message: "Success", result: workout });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}

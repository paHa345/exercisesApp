import { NextRequest, NextResponse } from "next/server";
import Exercise from "@/app/models/ExerciseModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import User from "@/app/models/UserModel";

export async function GET(req: NextRequest, { params }: { params: { mainGroup: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }
  try {
    await connectMongoDB();
    const sortParameter = req.nextUrl.searchParams?.get("filter");
    const sortOrder = req.nextUrl.searchParams?.get("increment") === "true" ? 1 : (-1 as 1 | -1);
    const sortQuery = { [sortParameter as string]: sortOrder };

    const page = parseInt(req.nextUrl.searchParams?.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams?.get("limit") || "3", 10);
    const skip = (page - 1) * limit;

    const currentUser: any = await User.findOne({ email: session?.user?.email });
    // const exercises = await Exercise.find({
    //   $and: [
    //     { $or: [{ createdUserId: { $eq: currentUser._id } }, { isBest: true }] },
    //     { mainGroup: { $eq: params?.mainGroup } },
    //   ],
    // }).populate("commentsArr");

    const exercises = await Exercise.aggregate([
      {
        $match: {
          $and: [
            { $or: [{ createdUserId: String(currentUser._id) }, { isBest: true }] },
            { mainGroup: { $eq: params?.mainGroup } },
          ],
        },
      },
      { $sort: sortQuery },
      { $skip: skip },
      { $limit: limit },
    ]);

    // const allExercises = await Exercise.aggregate([
    //   { $match: { $or: [{ createdUserId: String(currentUser._id) }, { isBest: true }] } },
    //   { $sort: sortQuery },
    // ]);
    return NextResponse.json({ message: "Success", result: exercises });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
// import { MongoClient, ObjectId } from "mongodb";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   let client;
//   let db;
//   try {
//     client = await MongoClient.connect(
//       `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bnjpnqkq0agsple?replicaSet=rs0`
//     );

//     db = client.db();
//   } catch (error) {
//     res.status(500).json({
//       message: "Не удалось подключиться к базе данных",
//     });
//     return;
//   }

//   if (req.method === "GET") {
//     try {
//       const result = await db
//         .collection("exercises")
//         .find({ mainGroup: req.query.mainGroup })
//         .toArray();

//       res.status(200).json({
//         message: "sucess",
//         result: result,
//       });
//       return;
//     } catch (error: any) {
//       res.status(400).json({ message: `${error.message}` });
//       return;
//     }
//   }
//   client.close();
// }

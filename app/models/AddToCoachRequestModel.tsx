import mongoose, { Mongoose } from "mongoose";
import { IAddToCoachRequstSchema, IUser } from "../types";
import User from "./UserModel";

const addToCoachRequestSchema = new mongoose.Schema<IAddToCoachRequstSchema>({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  coachId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  active: { type: Boolean, required: true },
});

addToCoachRequestSchema.pre("save", { document: true, query: false }, async function (doc, next) {
  console.log(` Coach ${this.coachId}`);
  const coach = await mongoose.model("User").findByIdAndUpdate(
    { _id: this.coachId },
    {
      $push: {
        requestToCoach: this._id,
      },
    }
  );

  const user = await mongoose.model("User").findByIdAndUpdate(
    { _id: this.userId },
    {
      $push: {
        addToStudentsRequests: this._id,
      },
    }
  );
});

addToCoachRequestSchema.pre("findOneAndUpdate", async function (result) {
  try {
    const updatedDoc = await mongoose
      .model("AddToCoachRequest")
      .findOne({ _id: this.getQuery()._id._id });

    const coach: IUser | null = await mongoose.model("User").findOne({
      $and: [{ _id: updatedDoc.coachId }, { studentsArr: { $in: [String(updatedDoc.userId)] } }],
    });

    if (coach !== null) {
      //   throw new Error("Не удалось обновить БД, повторите запрос позже");
    } else {
      const coachUpdated = await mongoose
        .model("User")
        .findByIdAndUpdate(
          { _id: updatedDoc.coachId },
          { $push: { studentsArr: updatedDoc.userId } }
        );
    }

    const user: IUser | null = await mongoose.model("User").findOne({
      $and: [{ _id: updatedDoc.userId }, { coachesArr: { $in: [String(updatedDoc.coachId)] } }],
    });

    if (user !== null) {
      //   throw new Error("Не удалось обновить БД, повторите запрос позже");
    } else {
      const userUpdated = await mongoose
        .model("User")
        .findByIdAndUpdate(
          { _id: updatedDoc.userId },
          { $push: { coachesArr: updatedDoc.coachId } }
        );
    }
  } catch (error: any) {
    throw new Error("Не удалось обновить БД, повторите запрос позже");
  }
});

const AddToCoachRequest =
  mongoose.models.AddToCoachRequest ||
  mongoose.model<IAddToCoachRequstSchema>(
    "AddToCoachRequest",
    addToCoachRequestSchema,
    "execisesAppAddToCoachRequest"
  );

export default AddToCoachRequest;

import mongoose, { Mongoose } from "mongoose";
import { IAddToCoachRequstSchema } from "../types";

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

const AddToCoachRequest =
  mongoose.models.AddToCoachRequest ||
  mongoose.model<IAddToCoachRequstSchema>(
    "AddToCoachRequest",
    addToCoachRequestSchema,
    "execisesAppAddToCoachRequest"
  );

export default AddToCoachRequest;

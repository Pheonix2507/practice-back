import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema(
  {
    responses: { type: Object, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("SurveyResponse", surveyResponseSchema);

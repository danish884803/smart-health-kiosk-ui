import mongoose from "mongoose";

const HealthRecordSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,

  height: Number,
  weight: Number,
  temperature: Number,
  heartRate: Number,

  systolic: Number,
  diastolic: Number,
  oxygen: Number,
  glucose: Number,

  bmi: Number,
  bmiStatus: String,

  age: Number,
  gender: String,
  notes: String,

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.HealthRecord ||
  mongoose.model("HealthRecord", HealthRecordSchema);

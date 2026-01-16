import express from "express";
import HealthRecord from "../models/HealthRecord.js";

const router = express.Router();

/* ================= GET ALL RECORDS ================= */
router.get("/records", async (req, res) => {
  const records = await HealthRecord.find({ user: req.user.id })
    .sort({ createdAt: -1 });
  res.json(records);
});

/* ================= ADD RECORD ================= */
router.post("/add", async (req, res) => {
  const record = await HealthRecord.create({
    ...req.body,
    user: req.user.id,
  });
  res.json(record);
});

/* ================= EDIT RECORD ================= */
router.put("/:id", async (req, res) => {
  const updated = await HealthRecord.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* ================= DELETE RECORD ================= */
router.delete("/:id", async (req, res) => {
  await HealthRecord.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });
  res.json({ success: true });
});

export default router;

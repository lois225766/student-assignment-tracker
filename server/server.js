
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    dueDate: { type: String, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

app.get("/", (req, res) => {
  res.send("Student Assignment Tracker API is running!");
});

// Get all assignments
app.get("/api/assignments", async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
});

// Add an assignment
app.post("/api/assignments", async (req, res) => {
  try {
    const { title, subject, dueDate, priority } = req.body;

    if (!title?.trim() || !subject?.trim() || !dueDate) {
      return res.status(400).json({
        message: "Title, subject and due date are required",
      });
    }

    const assignment = await Assignment.create({
      title,
      subject,
      dueDate,
      priority,
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ message: "Failed to create assignment" });
  }
});

// Update an assignment
app.put("/api/assignments/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(400).json({ message: "Failed to update assignment" });
  }
});

// Delete an assignment
app.delete("/api/assignments/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete assignment" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import SurveyResponse from "./models/surveyResponse.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));  // Replace with frontend URL if different
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.get("/", (req, res) => res.send("Survey API is running!"));

// Route to save survey responses
app.post("/api/survey", async (req, res) => {
  try {
    const { responses } = req.body;
    if (!responses) return res.status(400).json({ error: "Responses are required" });

    const newResponse = new SurveyResponse({ responses });
    await newResponse.save();
    res.status(201).json({ message: "Survey response saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

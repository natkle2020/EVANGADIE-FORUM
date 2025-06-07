import express from "express";
import { getSingleQuestion } from "../controller/questionController.js";

const router = express.Router();

// GET a single question by ID
router.get("/:question_id", getSingleQuestion);

export default router;

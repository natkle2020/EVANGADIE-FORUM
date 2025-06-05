import express from "express";
import { getAllQuestions } from "../controller/questionController.js";
const router = express.Router();

//all question route (@abatebereket)
router.get("/", getAllQuestions);


//one question route // suggestion for a teammate
// router.get("/:question_id", getQuestionById);

//post question route // suggestion for a teammate
// router.post("/", createQuestion);

export default router;



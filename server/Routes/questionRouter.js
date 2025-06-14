import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  askquestion,
  getAllQuestions,
  getSingleQuestion,
} from "../controller/questionController.js";

const router = express.Router(); //create new router object


// Insert question - Only logged-in users
router.post("/", authMiddleware, askquestion);

//all question route
router.get("/", authMiddleware, getAllQuestions);

//get a question by id
router.get("/:question_id",authMiddleware, getSingleQuestion);
export default router;


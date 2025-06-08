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

//bere
//all question route
router.get("/", getAllQuestions);

router.get("/:question_id", getSingleQuestion);
export default router;


import express from "express";
import { auth } from "../middleware/auth.js";
import {
  askquestion,
  getAllQuestions,
} from "../controller/questionController.js";

const router = express.Router(); //create new router object

// Insert question - Only logged-in users
router.post("/", auth, askquestion);

//bere
//all question route
router.get("/", getAllQuestions);

export default router;


//helen
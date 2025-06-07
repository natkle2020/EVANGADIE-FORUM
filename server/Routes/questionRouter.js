//berehanu

import express from "express"
import { getAllQuestions } from "../controller/questionController.js";

const router = express.Router()



//all question route
router.get("/all-questions", getAllQuestions);


export default router;

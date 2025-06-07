//berhanu

import express from "express"
import { getAllQuestions } from "../controller/questionController.js";

const router = express.Router()



// all question route
router.get("/", getAllQuestions);


export default router;

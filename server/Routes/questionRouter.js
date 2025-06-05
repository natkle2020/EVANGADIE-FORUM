import express from "express";
import { getAllQuestions } from "../controllers/questionController.js";
const router = express.Router();

//all question route
router.get("/", getAllQuestions);

//one question route

//post question route

export default router;

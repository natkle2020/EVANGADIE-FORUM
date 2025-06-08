import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getAnswersByQuestionId, postAnswer } from '../controller/answerController.js';


const router = express.Router();


//protected route to post an answer(using JWT Token)
router.post('/', authMiddleware, postAnswer);

//public route to get answer
router.get('/:id', getAnswersByQuestionId)

export default router;
import express from 'express'
import {postAnswer,getAnswer} from '../controller/answerController.js'
const router = express.Router()

router.post('/', postAnswer)
router.get('/:qid',getAnswer)

export default router;
import {StatusCodes} from 'http-status-codes'
import connection from '../config/databaseConfig.js'
export async function postAnswer(req,res){
    const answer = req.body.answer
    const questionid = req.body.questionid
    const userid = req.body.user_id
    if(!answer || !questionid || !userid){
          return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please fill in all required fields." });
        }
        if(answer.length < 10 || !isNaN(answer)){
       return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Very short or Invalid input'});
        
    }
    const inputAnswerQuery = 'INSERT INTO answers (question_id , user_id, answer) VALUES (?,?,?) '
    try {
        await connection.query(inputAnswerQuery,[questionid,userid,answer])
        res.status(StatusCodes.CREATED).json({ message: 'Succusfully Created the reply(Answer)'});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Unable to insert to database: Internal Server Error", error : error.message });
    }
} 
export async function getAnswer(req,res){
     const { qid } = req.params;
     if(!qid){
          return res.status(StatusCodes.NOT_FOUND).json({ message: "Can't find answer for this questions" });
        }
        const selectAnswer = 'SELECT * FROM answers WHERE question_id = ?'
        try {
            const [answers] = await connection.query(selectAnswer,[qid])
            return res.status(StatusCodes.OK).json({ message: "Succusfully qeuried answers", Answer: answers });
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Unable to insert to database: Internal Server Error", error : error.message });
    }
} 


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


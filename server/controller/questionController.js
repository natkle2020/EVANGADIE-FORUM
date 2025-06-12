import { StatusCodes } from "http-status-codes";
import pool from "../config/databaseConfig.js"; // DB connection

// post question into the database/questions submissions/
export async function askquestion(req, res) {
  const { title, question, description, tag } = req.body;
  const userId = req.user.user_id;

  // Validates input: if required fields are missing, it sends back a 400 Bad Request error.
  if (!title || !question || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        success: false,
        status: 400,
        error: "Please Provide all the required fields.",
        msg: "Title question and Description are required."
       });
  }

  try {
    const timestamp = new Date();

    const result = await pool.execute(
      "INSERT INTO questions (user_id, title, question, description, tag, time) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, title, question, description, tag || null, timestamp]
    );


    //success response
     res
      .status(StatusCodes.CREATED)
      .json({
        success: true,
        status: 201,
        question_id: result[0].insertId,
        msg: "Question posted successfully!"
       });

       console.log(`Question with ID: ${result[0].insertId}posted `)


  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ 
        error: 'Failed to post question. Please try again later',
        msg: "Something went wrong, try again."
      });
  }
}

//all-question
export async function getAllQuestions(req, res) {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        q.question_id, 
        q.title, 
        q.time, 
        u.username 
      FROM 
        questions q
      JOIN 
        users u ON q.user_id = u.user_id
      ORDER BY 
        q.question_id DESC
      LIMIT 10
    `);

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });

    console.log('Retrieved:', rows)


  } catch (error) {
    console.error('Get all questions error:', error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: 'Failed to retrieve questions. Please try again later'
    });
  }
}

//get question by id 
export const getSingleQuestion = async (req, res) => {
    const { question_id } = req.params;
    const questionIdNum = Number(question_id);
  
    // Validate question_id
    if (!Number.isInteger(questionIdNum) || questionIdNum <= 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid question ID" });
    }
  
    // SQL to get question with asker info
    const questionQuery = `
      SELECT
        q.*,
        u.username AS asked_by_username,
        u.first_name AS asked_by_first_name,
        u.last_name AS asked_by_last_name
      FROM questions q
      JOIN users u ON q.user_id = u.user_id
      WHERE q.question_id = ?
    `;
  
    try {
      const [questionRows] = await pool.query(questionQuery, [questionIdNum]);

      console.log(questionRows[0])
  
      if (questionRows.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          status: 404,
          error: "not found",
          message: "Question not found" });
      }
  
      const [row] = questionRows;
  
      const question = {
        question_id: row.question_id,
        title: row.title,
        question: row.question,
        description: row.description,
        tag: row.tag,
        time: new Date(row.time).toISOString(),
        asked_by: {
        username: row.asked_by_username,
        first_name: row.asked_by_first_name,
        last_name: row.asked_by_last_name,
        },
      };
  
      res.status(StatusCodes.OK).json({
        success: true,
        status: 200,
        message: "Question retrieved successfully",
        question: question
      });

      console.log(`Retrieved question ${question_id}`);



    } catch (error) {
      console.error("Error fetching question:", error.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          status: 500,
          error: "Failed to retrieve question. Please try again later.",
        });
    }
  };

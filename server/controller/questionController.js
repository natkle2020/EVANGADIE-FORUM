import { StatusCodes } from "http-status-codes";
import pool from "../config/databaseConfig.js"; // DB connection

// post question into the database/questions submissions/
export async function askquestion(req, res) {
  const { title, description, tag } = req.body;
  const userId = req.user.user_id;

  // Validates input: if required fields are missing, it sends back a 400 Bad Request error.
  if (!title || !description) {
<<<<<<< HEAD
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      status: 400,
      error: "Please Provide all the required fields.",
      msg: "Title question and Description are required.",
    });
=======
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        success: false,
        status: 400,
        error: "Please Provide all the required fields."
       });
>>>>>>> main
  }

  try {
    const result = await pool.execute(
      "INSERT INTO questions (user_id, title, description, tag) VALUES (?, ?, ?, ?)",
      [userId, title, description, tag || null]
    );
<<<<<<< HEAD
=======
// console.log(result)
>>>>>>> main

    //success response
    res.status(StatusCodes.CREATED).json({
      success: true,
      status: 201,
      question_id: result[0].insertId,
      msg: "Question posted successfully!",
    });
  } catch (error) {
    console.error(error);
<<<<<<< HEAD
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to post question. Please try again later",
      msg: "Something went wrong, try again.",
    });
=======
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ 
        error: 'Failed to post question. Please try again later',
      });
>>>>>>> main
  }
}

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
      data: rows,
    });

    console.log("Retrieved:", rows);
  } catch (error) {
    console.error("Get all questions error:", error.message);
    res.status(500).json({
      success: false,
<<<<<<< HEAD
      message: "Internal Server Error",
      error: "Failed to retrieve questions. Please try again later",
=======
      error: 'Failed to retrieve questions. Please try again later'
>>>>>>> main
    });
  }
}

export const getSingleQuestion = async (req, res) => {
  const { question_id } = req.params;

  const questionQuery = `
  SELECT q.*, u.username, u.first_name , u.last_name
  FROM questions q
  JOIN users u ON q.user_id = u.user_id
  WHERE q.question_id = ?
`;

  try {
    const [result] = await pool.execute(questionQuery, [question_id]);

    if (result.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          success: false,
          status: 404,
          error: "not found",
          message: "Question not found",
        });
    }
    const [data] = result;

    res
      .status(StatusCodes.OK)
      .json({
        success: true,
        status: 200,
        message: "Question queried successfully",
        question: {
          question_id: data.question_id,
          title: data.title,
          description: data.description,
          tag: data.tag,
          time: new Date(data.time).toISOString(),
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
        },
      });
  } catch (error) {
    console.error("Error fetching question:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        status: 500,
        error: "Unable to query question. Internal Server Error",
      });
  }
<<<<<<< HEAD
};
=======
  const [data] = result


  res.status(StatusCodes.OK).json({ success: true, status: 200, 
    message: "Question queried successfully",
    question :   {question_id: data.question_id,
    title: data.title,
    description: data.description,
    tag: data.tag,
    time: new Date(data.time).toISOString(),
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name} 
  });

} catch (error) {
  console.error("Error fetching question:", error.message);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, status: 500, error: "Unable to query question. Internal Server Error"});
}

  }

  
    // So if a user asked a question he can delete it

// export const deleteQuestion = async (req, res) => {
//   const { question_id } = req.params;
//   const userId = req.user.user_id; // Get user ID from authenticated user

//   // Validate question_id
//   if (!question_id) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       success: false,
//       status: 400,
//       error: "Question ID is required"
//     });
//   }

//   try {
//     // First let's check if the question exists and if that user asked it
//     const [questionCheck] = await pool.execute(
//       "SELECT user_id FROM questions WHERE question_id = ?",
//       [question_id]
//     );

//     if (questionCheck.length === 0) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         success: false,
//         status: 404,
//         error: "Question not found"
//       });
//     }

//     // Check if the user owns the question
//     if (questionCheck[0].user_id !== userId) {
//       return res.status(StatusCodes.FORBIDDEN).json({
//         success: false,
//         status: 403,
//         error: "You can only delete your own questions"
//       });
//     }

//     // Delete from database
//     await pool.execute(
//       "DELETE FROM answers WHERE question_id = ?",
//       [question_id]
//     );

//     // Delete the question
//     const [result] = await pool.execute(
//       "DELETE FROM questions WHERE question_id = ? AND user_id = ?",
//       [question_id, userId]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         success: false,
//         status: 404,
//         error: "Question not found or already deleted"
//       });
//     }

//     // Success response
//     res.status(StatusCodes.OK).json({
//       success: true,
//       status: 200,
//       message: "Question deleted successfully"
//     });

//   } catch (error) {
//     console.error("Delete question error:", error.message);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       status: 500,
//       error: "Failed to delete question. Please try again later"
//     });
//   }
// };

// Updating Questions Asked
// export const updateQuestion = async (req, res) => {
//    const { question_id } = req.params;
//   const { title, description } = req.body;
//   const userId = req.user.user_id; // From auth middleware

//   try {
//     // Validate input
//     if (!title || title.trim().length === 0) {
//       return res.status(400).json({
//         success: false,
//         error: "Question title is required"
//       });
//     }

//     // Check if title is too long
//     if (title.trim().length > 255) {
//       return res.status(400).json({
//         success: false,
//         error: "Question title must be 255 characters or less"
//       });
//     }

//     // Check if description is too long (if provided)
//     if (description && description.trim().length > 1000) {
//       return res.status(400).json({
//         success: false,
//         error: "Question description must be 1000 characters or less"
//       });
//     }

//     // First, verify the question exists and belongs to the user
//     const checkQuery = `
//       SELECT user_id, title 
//       FROM questions 
//       WHERE question_id = ?
//     `;
    
//     const [existingQuestion] = await db.query(checkQuery, [questionId]);
    
//     if (existingQuestion.length === 0) {
//       return res.status(404).json({
//         success: false,
//         error: "Question not found"
//       });
//     }

//     // Check ownership
//     if (existingQuestion[0].user_id !== userId) {
//       return res.status(403).json({
//         success: false,
//         error: "You can only edit your own questions"
//       });
//     }

//     // Update the question
//     const updateQuery = `
//       UPDATE questions 
//       SET title = ?, description = ?, updated_at = NOW()
//       WHERE question_id = ?
//     `;
    
//     const updateValues = [
//       title.trim(),
//       description ? description.trim() : null,
//       questionId
//     ];

//     const [updateResult] = await db.query(updateQuery, updateValues);

//     if (updateResult.affectedRows === 0) {
//       return res.status(500).json({
//         success: false,
//         error: "Failed to update question"
//       });
//     }

//     // Return success response
//     res.status(200).json({
//       success: true,
//       message: "Question updated successfully",
//       data: {
//         question_id: questionId,
//         title: title.trim(),
//         description: description ? description.trim() : null,
//         updated_at: new Date().toISOString()
//       }
//     });

//   } catch (error) {
//     console.error("Error updating question:", error);
//     res.status(500).json({
//       success: false,
//       error: "Internal server error"
//     });
//   }
// }
>>>>>>> main

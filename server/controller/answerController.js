import pool from "../config/databaseConfig.js";

export const getAnswersByQuestionId = async (req, res) => {
    const questionId = parseInt(req.params.question_id);

    if (isNaN(questionId)) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Invalid question_id parameter",
        });
    }

    const query = `
    SELECT a.answer_id, a.content, u.user_name, a.created_at
    FROM answers a
    JOIN users u ON a.user_id = u.user_id
    WHERE a.question_id = ?
  `;

    try {
        const [results] = await pool.query(query, [questionId]);
        if (results.length === 0) {
            return res.status(404).json({
                error: "Not Found",
                message: "The requested question could not be found.",
            });
        }
        res.status(200).json({ answers: results });
    } catch (err) {
        console.error("Error fetching answers:", err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred.",
        });
    }
};



//post
export async function postAnswer(req, res) {
	// Validating of user(req.user) from JWT middleware
	if (!req.user || !req.user.user_id) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			success: false,
			status: 401,
			error: "User Authentication Failed",
		});
	}
    
	// Get user ID from authenticated user (set by authMiddleware)
	const userId = parseInt(req.user.user_id);
	if (isNaN(userId)) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			success: false,
			status: 400,
			error: "Invalid user ID",
		});
	}

	// Validating request body
	if (!req.body) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			success: false,
			status: 400,
			error: "Request body is missing",
		});
	}

	// Extract questionid and answer from request body
	const answer = req.body.answer?.trim();
	const questionId = parseInt(req.body.question_id);

	// Validate required fields
    if (!answer || !questionId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            status: 400,
            error: 'Please provide all required fields(question_id and answer)'
        });
    }

    if (isNaN(questionId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                status: 400,
                error: "Invalid question ID",
            });
        }


        // Validating answer length (here answers can be longer than questions)
        if (answer.length < 10) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                status: 400,
                error: "Answer must be at least 10 characters long",
            });
        }

        if (answer.length > 5000) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                status: 422,
                error: "Answer must not exceed 5000 characters",
            });
        }

        

	try {
        //Checking if the question Exists
        const query = `SELECT question_id FROM questions WHERE question_id = ?`;
        const [questionCheck] = await connection.execute(query, [questionId]);

        // console.log(questionCheck);

        if (questionCheck.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                status: 404,
                error: 'Question Not Found'
            })
        }
       

        // Insert new answer into database
        const insertQuery = `INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)`;

        const [rows] = await connection.execute(insertQuery, [questionId, userId, answer]);

        

        //Success Response
        res.status(StatusCodes.CREATED).json({
            success: true,
            status: 201,
            message: 'Answer Posted Successful',
            answer_id: rows.insertId,
        });


         console.log(`Answer posted by user ID ${userId} for question ID ${questionId}: Answer ID ${rows.insertId}`
        );


	} catch (error) {
		console.error(error.message);
		// Return 500 Internal Server Error for any unexpected errors
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred.",
		});
	}
}
// helen part
import pool from "../config/databaseConfig.js"; // DB connection
import { StatusCodes } from "http-status-codes";

export const getSingleQuestion = async (req, res) => {
  const { question_id } = req.params;
  const questionIdNum = Number(question_id);

  // Validate question_id
  if (!Number.isInteger(questionIdNum) || questionIdNum <= 0) {
    return res.status(400).json({ message: "Invalid question ID" });
  }

  // SQL to get question with asker info
  const questionQuery = `
    SELECT
      q.question_id,
      q.title,
      q.question,
      q.description,
      q.tag,
      q.time,
      u.username AS asked_by_username,
      u.first_name AS asked_by_first_name,
      u.last_name AS asked_by_last_name
    FROM questions q
    JOIN users u ON q.user_id = u.user_id
    WHERE q.question_id = ?
  `;

  try {
    const [questionRows] = await pool.query(questionQuery, [questionIdNum]);

    if (questionRows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
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

    res.status(StatusCodes.Ok).json(question);
  } catch (error) {
    console.error("Error fetching question:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

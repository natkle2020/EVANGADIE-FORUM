import dbConnection from "../config/databaseConfig.js";
import { StatusCodes } from "http-status-codes";

// Insert the question into the database
export async function askquestion(req, res) {
  const { title, question, description, tag } = req.body;
  const userId = req.user.user_id;

  if (!title || !question || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Title question and Description are required." });
  }

  try {
    const timestamp = new Date();

    const result = await dbConnection.query(
      "INSERT INTO questions (user_id, title, question, description, tag, time) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, title, question, description, tag || null, timestamp]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question posted successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again." });
  }
}

//all-question

export async function getAllQuestions(req, res) {
  try {
    const result = await dbConnection.execute(`
      SELECT * FROM questions
      ORDER BY id DESC
      LIMIT 5
    `);
    console.log(result);
    const [rows] = result;

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

import express from "express";
import db from "../db/index.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// POST /api/answer
router.post("/", authenticate, async (req, res) => {
	const { questionId, answer } = req.body;
	const userId = req.user.userid;

	if (!questionId || !answer) {
		return res.status(400).json({
			error: "Bad Request",
			message: "Please provide questionId and answer",
		});
	}

	try {
		await db.query(
			"INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)",
			[questionId, userId, answer]
		);

		return res.status(201).json({
			message: "Answer posted successfully",
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Server Error",
			message: "Something went wrong",
		});
	}
});

export default router;

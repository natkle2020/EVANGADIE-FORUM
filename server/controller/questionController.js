//berhanu
//1. all-question

import dbConnection from "../config/databaseConfig.js";

export async function getAllQuestions(req, res) {
    try {
        const result = await dbConnection.execute(`
      SELECT * FROM questions
      ORDER BY id DESC
      LIMIT 5
    `);
        console.log(result); // 
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

//2. one question.......

//3. post question......
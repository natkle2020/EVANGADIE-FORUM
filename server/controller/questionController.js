//berhanu

import dbConnection from "../config/databaseConfig.js";

// Get latest 5 questions from the database
export async function getAllQuestions(req, res) {
    try {
        // Define query
        const query = `
            SELECT * FROM questions
            ORDER BY id DESC
            LIMIT 5
        `;

        // Execute query
        const [rows] = await dbConnection.execute(query);

        // Send successful response
        return res.status(200).json({
            success: true,
            data: rows,
        });

    } catch (error) {
        // Log and handle error
        console.error("Error fetching questions:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}




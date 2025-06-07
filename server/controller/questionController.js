//bereket
//1. all question
import dbConnection from "../config/databaseConfig"; 

export async function getAllQuestions(req, res) {
  try {
    const [rows] = await dbConnection.execute(`
      SELECT * FROM questions 
      ORDER BY time DESC 
      LIMIT 5
    `);

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



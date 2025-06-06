
//1. all question
export function getAllQuestions(req, res) {
  try {
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}




//2. one question.......




//3. post question......



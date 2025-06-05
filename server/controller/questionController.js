// Sample data
// const questions = [
//   { id: 1, title: "What is Node.js?", body: "Explain Node.js?" },
//   { id: 2, title: "How to use Express?", body: "Help with routing" },
// ];


//1. all question
// export function getAllQuestions(req, res) {
//   res.json(questions);
// }
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



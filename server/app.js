// 1. Imports
import express from "express";
//questions routes middleware file
import questionRoutes from "./Routes/questionRouter.js";

// 2. App setup
const app = express();
app.use(express.json());
const port = 3100;

// 3. questions routes middleware
// app.use("/api/question", questionRoutes);
app.get("/api/question", (req,res)=>{
  res.send('Welcome')
});

// 4. Server start
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

// async function start() {
//   try {
//     const result = await dbconnection.execute("select 'test' ");
//     await app.listen(port);
//     console.log("database connection established");
//     console.log(`listening on ${port}`);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// start()

// 8.Title: Implement API Endpoint: Get All Questions
// Description: Develop the API endpoint to fetch all questions.
// Endpoint: api/question
// Acceptance Criteria:
// 1. Endpoint Implementation:
// ○ Create the /api/question endpoint using the HTTP GET method.
// 2. Response Handling:
// ○ Handle responses with JSON payload containing all questions and associated metadata.
// 3. Error Handling:
// ○ Implement error handling for client errors (Follow api doc) or server errors (500 Internal Server Error).
// Label: API Development, Get All Questions
// TaskPoints: 4 days
// Attachments:
// ● [Link to API documentation]
// Assignee: [@abatebereket]

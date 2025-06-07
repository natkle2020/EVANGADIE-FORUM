import express from "express";
import cors from "cors";
import pool from "./config/databaseConfig.js";
import { createAllTables } from "./controller/createAllTables.js";
// import userRouter from "./Routes/userRouter.js";
// import answerRouter from "./Routes/answerRouter.js";
import questionRouter from "./Routes/questionRouter.js"; //Don't we need the extensions above too?



const app = express();
const port = process.env.PORT;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

//API Routes
// app.use("api/auth", userRouter);
app.use("/api/question", questionRouter); //question without -s
// app.use("/api/answers", answerRouter);

// ✅ Test DB Connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL connected via pool!");
    connection.release();
    return true;
  } catch (err) {
    console.error("❌ MySQL error:", err); //Logging the Whole Error object for debugging
    return false;
  }
};

// ✅ Start the server
const startServer = async () => {
  console.log("🔄 Testing database connection...");
  const isConnected = await testConnection();

  if (!isConnected) {
    console.error("Failed to connect to database. Exiting...");
    process.exit(1); //Kills the app if database fails
  }

  if (process.env.INIT_DB === "true") {
    try {
      await createAllTables();
    } catch (err) {
      console.error("Failed to initialize tables. Exiting...");
      process.exit(1);
    }
  }

  //Start Listening
  const server = app.listen(port, () => {
    console.log(`listening on ${port}`);
  });

  // Handle server startup errors
  server.on("error", (err) => {
    console.error("Server startup error:", err.message);
    process.exit(1);
  });
};

// Start everything
startServer();

//Bereket's and Bere's tasks
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


//From ReactApiandRouting project
// const mysql = require("mysql2");
// const express = require("express");
// let app = express();
// const cors = require("cors");
// app.use(cors());
// let myConnection = mysql.createConnection({
//   user: "myDBuser",
//   password: "123456",
//   host: "localhost",
//   database: "myDB",
// });
// myConnection.connect((err) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("Connected to DB!");
//   }
// });
// const port = 3001;
// app.listen(port, (err) => {
//   if (err) console.log(err.message);
//   else console.log(`Server running at http://localhost:${port}`);
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/iphones", (req, res) => {
//   myConnection.query(
//     `SELECT * 
// FROM Products 
// JOIN Product_description ON Products.Product_ID = Product_description.Product_ID
// JOIN Product_price ON Products.Product_ID = Product_price.Product_ID;
// `,
//     (err, results, fields) => {
//       if (!err) res.json(results);
//       else console.log("Error Found", err);
//     }
//   );
// });

// //nodemon app.js once i opened my terminal on the package.json of the server project

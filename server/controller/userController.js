import pool from "../config/databaseConfig.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { username, first_name, last_name, email, password } = req.body;

  //check if all fields are provided
  if (!email || !password || !first_name || !last_name || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ 
        msg: "please provide all required information!",
        error: 'All Fields are Required' });
  }


    //Password length Check
    if (password.trim().length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters" });
    }



  try {
    //check if username or email already exists(row, field)
    const [user] = await pool.query(
      "SELECT username, user_id from users where username = ? or email =?",
      [username, email]
    );
    
    if (user.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "user already registered" });
    }


    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.execute(
      "INSERT INTO users (username, first_name, last_name, email, password) VALUES (?,?,?,?,?)",
      [username, first_name, last_name, email, hashedPassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user created" });
  } catch (error) {

    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ 
        msg: "something went wrong, try again later!",
        error: 'Registration Failed. Please Try Again'
      });
  }
}

export async function login(req, res) {

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ 
        msg: "please enter all rquired fields",
        error: 'Email and Password are Required'
       });
  }

  try {

    //Finding User using Email
    const [user] = await pool.execute(
      "SELECT username, user_id, password from users where email = ? ",
      [email]
    );


    if (user.length == 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ 
          msg: "User not found",
          error: "Invalid Credentials"
         });
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "invalid credential" });
    }

    //json webtoken
    const {username, user_id} = user[0];

    const token = jwt.sign({ username, user_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

     res
      .status(StatusCodes.OK)
      .json({ 
        msg: "user login successful", 
        success: true,
        user : {
          user_id: user[0].user_id,
          username: user[0].username,
        },
        token
       });

      //  console.log(`User logged in: ${user.username} (ID: ${user.user_id})`)
       console.log(user)

  } catch (error) {

    console.log(error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ 
        sucess: false,
        msg: "something went wrong, try again later!" ,
        error: `Login Failed. Please Try again Later ${error.message}`,
      });
  }
}

export async function checkUser(req, res) {
  const username = req.user.username;
  const user_id = req.user.user_id;

  res.status(StatusCodes.OK).json({ msg: "valid user", username, user_id });
}

 


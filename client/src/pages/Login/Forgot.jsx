import React, { useRef } from "react";
import axios from "../../utils/Api";
// import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css"; // import CSS module

function Forgot() {
  const emailRef = useRef();
//   const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      const { data } = await axios.post("/users/forgot-password", {
        email,
      });

      alert("Reset link sent to your email!");
    //   navigate("/login");
    } catch (err) {
      console.log(err.response?.data?.msg);
      alert("Something went wrong.");
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Forgot Password?</h2>
      <p className={classes.description}>
        Enter your email and we’ll send you a reset link.
      </p>
      <form onSubmit={handleReset}>
        <input
          ref={emailRef}
          type="email"
          placeholder="Your Email"
          className={classes.input}
        />
        <br />
        <button type="submit" className={classes.button}>
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default Forgot;
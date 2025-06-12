import React, { useRef } from "react";
import axios from "../../utils/axiosConfig";
// import { Link, useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";

function SignUp() {
  // const navigate = useNavigate();
  const userNameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const usernamevalue = userNameDom.current.value;
    const firstnamevalue = firstnameDom.current.value;
    const lastnamevalue = lastnameDom.current.value;
    const emailvalue = emailDom.current.value;
    const passwordvalue = passwordDom.current.value;

    if (
      !usernamevalue ||
      !firstnamevalue ||
      !lastnamevalue ||
      !emailvalue ||
      !passwordvalue
    ) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernamevalue,
        firstname: firstnamevalue,
        lastname: lastnamevalue,
        email: emailvalue,
        password: passwordvalue,
      });
      alert("Registration successful. Please login.");
      // navigate("/login");
    } catch (error) {
      alert("Something went wrong");
      console.error(error); // optional
    }
  }

  return (
    <section className={classes.container.main}>
      <form className={classes.container} onSubmit={handleSubmit}>
        <div>
          <span>Username: </span>
          <input ref={userNameDom} type="text" placeholder="Username" />
        </div>
        <br />
        <div>
          <span>First Name: </span>
          <input ref={firstnameDom} type="text" placeholder="First name" />
        </div>
        <br />
        <div>
          <span>Last Name: </span>
          <input ref={lastnameDom} type="text" placeholder="Last name" />
        </div>
        <br />
        <div>
          <span>Email: </span>
          <input ref={emailDom} type="email" placeholder="Email" />
        </div>
        <br />
        <div>
          <span>Password: </span>
          <input ref={passwordDom} type="password" placeholder="Password" />
        </div>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <a to={"/login"}>Login</a>
    </section>
  );
}

export default SignUp;

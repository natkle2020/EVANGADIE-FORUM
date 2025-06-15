import React, { useRef, useState } from "react";
 import axios from '../../utils/axios'
import { Alert, Spinner } from "react-bootstrap";
import styles from './AuthPage.module.css';
import { Link } from "react-router-dom";

function SignUp({toggler}) {
  const [status, setStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState();


  const emailRef = useRef();
  const passwordRef = useRef(null);
  const first_nameRef = useRef(null);
  const last_nameRef = useRef(null);
  const usernameRef = useRef(null);

  //Simple Message
  const showStatus = (message, type) => {
    setStatus({ message, type });

    //Auto clear Status after 5 secs
    setTimeout(() => {
      setStatus({ message: "", type: "" });
    }, 5000);
  };

  //Form Validation Function
  const validateForm = () => {
    const userName = usernameRef.current.value.trim();
    const firstName = first_nameRef.current.value.trim();
    const lastName = last_nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    //CHECKING FOR EMPTY FELIDS
    if (!email || !password || !userName || !firstName || !lastName) {
      showStatus("Please Enter All the required fields ", "error");
      return false;
    }

    // Password length validation
    if (password.length < 8) {
      showStatus("Password must be at least 8 characters long", "error");
      return false;
    }

    return true;
  };

  //Sign Up Function
  async function signup(e) {
    e.preventDefault();

    setStatus({ message: "", type: "" });
    if (!validateForm()) return;

    const userData = {
      first_name: first_nameRef.current.value.trim(),
      last_name: last_nameRef.current.value.trim(),
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value,
    };

    try {
      setLoading(true);

      const result = await axios.post("/auth/register", userData);
      if (result.data?.success) {
        showStatus("User registered successfully", "success");

        // Navigating to login after 1.5 seconds
        setTimeout(() => {
          setStatus({ message: "", type: "" });
          toggler(e);
        }, 1500);

      } else {
        showStatus(
          result.data?.error || "Registration failed. Please try again later."
        );
      }

    
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Something went wrong!";
      showStatus(errorMessage, "error");
    }finally{
      setLoading(false)
    }
  }

 

  return (
    <div className={styles.formCard}>
      <h3>Create account</h3>
      <p className={styles.registerText}>
        Already have an account?{" "}
        <Link to = "#" onClick={toggler}>
          Sign in{" "}
        </Link>
      </p>

      {status.message && (
            <Alert variant={status.type === "error" ? "danger" : "success"}>
              {status.message}
            </Alert>
          )}




      <form onSubmit={signup}>
        <input ref={emailRef} type="email" placeholder="Your Email" />
        <div className={styles.nameContainer}>
          <input ref={first_nameRef} type="name" placeholder="First Name" />
          <input ref={last_nameRef} type="name" placeholder="Last Name" />
        </div>
        <input ref={usernameRef} type="text" placeholder="Username" />
        <input ref={passwordRef} type="password" placeholder="Your Password" />

        {loading ? (
          <>
          <Spinner animation="border" size="sm"/>Registering...
          </>
        ):(
          <button type="submit">Agree and Join</button>
        )}

   
        
      </form>
    </div>
  );
}

export default SignUp;

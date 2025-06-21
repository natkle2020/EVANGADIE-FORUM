import React, { useContext, useRef, useState } from "react";
import axios from '../../utils/axios'
import { Type } from "../../utils/action";
import { Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Components/Context";
import styles from './AuthPage.module.css'

function Login({toggler}) {
  const [status, setStatus] = useState({ message: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [{user}, dispatch] = useContext(Context)
  const navigate = useNavigate();
  const emailLoginRef = useRef();
  const passwordLoginRef = useRef(null);

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
    const email = emailLoginRef.current.value.trim();
    const password = passwordLoginRef.current.value;

    //CHECKING FOR EMPTY FELIDS
    if (!email || !password) {
      showStatus("Please Enter All the required fields ", "error");
      return false;
    }

    return true; 
    
  };

  //Log in Function
  async function login(e) {
    e.preventDefault();
    setStatus({ message: "", type: "" });

    if (!validateForm()) return;

    const credentials = {
      email: emailLoginRef.current.value,
      password: passwordLoginRef.current.value,
    };

    try {
      setLoading(true);

      const result = await axios.post("/auth/login", credentials);
// credential declaire adirgenatal lelay email ena password expect yadergal


      console.log("Login response:", result.data);

      if (result.data?.success) {
        const token = result?.data?.token;
        const username = result?.data?.user.username;
        const user_id = result?.data?.user?.user_id;

        //The after storing them in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("user_id", user_id);
       

        // So after setting the token & user in localStorage we Update the context
         dispatch({
          type: Type.SET_USER,
          user: result.data.user,
        });
         console.log("User set in context:", result.data.user);

        showStatus("Login successful! Redirecting...", "success");

        // So after login We Navigate to home after short delay to show success message
        setTimeout(() => {
          navigate("/");
        }, 1500);
        
    
      }else {
        console.log("Login failed:", result.data);

        showStatus("Login failed. Please try again.");
      }


    } catch (error) {
      const errorMessage = error.response?.data?.error || "Something went wrong!";
      showStatus(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

 

  return (
    <div className={styles.formCard}>
      <h3>Login to your account</h3>
      <p className={styles.registerText}>
        Don’t have an account?{" "}
        <Link to = "/auth" onClick={toggler}>
          Create a new account
        </Link>
      </p>

      {status.message && (
        <Alert variant={status.type === "error" ? "danger" : "success"}>
          {/* If status.type is "error", use a red ("danger") alert. Otherwise, use green ("success") */}
          {status.message}
{/* Displays the actual message (like "Login successful!" or "Invalid password") */}


        </Alert>
      )}


      <form onSubmit={login}>
        <input
          ref={emailLoginRef}
          type="email"
          placeholder="Your Email"
          required
        />
        <input
          className={styles.password}
          ref={passwordLoginRef}
          type={showPassword ? "text" : "password"}
          placeholder="Your Password"
          required
        />
        <p className={styles.eye} onClick={handleShowPassword}>
          {showPassword ? `👀` : "👁️‍🗨️"}
        </p>
        
        <button type="submit" disabled = {loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Logging In... 
              {/* loding spinner little circle */}
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <Link className={styles.createAccount} to = "#" onClick={toggler}>
        Create an account?
      </Link>
    </div>
  );
}

export default Login;

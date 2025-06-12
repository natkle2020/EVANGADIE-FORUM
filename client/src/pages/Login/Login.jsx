import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/Api.js";
import classes from "./Login.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        mail: emailValue,
        password: passValue,
      });

      alert("Login successful!");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert("Something went wrong!");
      console.log(error?.response?.data?.msg);
    }
  }

  return (
    <section className={classes.login_container}>
      <form onSubmit={handleSubmit}>
        <h3>Login to your account</h3>
        <h5>
          Don't have an account?{" "}
          <Link className={classes.register} to={"/register"}>
            Create a new account
          </Link>
        </h5>

        <div>
          <input ref={emailDom} type="text" placeholder="Your Email" />
        </div>
        <br />

        <div style={{ position: "relative" }}>
          <input
            ref={passwordDom}
            type={showPassword ? "text" : "password"}
            placeholder="Your Password"
            style={{ paddingRight: "40px" }}
          />
          <span
            onClick={togglePassword}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "rgb(170, 167, 167)",
            }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        <br />
        <Link className={classes.forgot_password} to="/forgot-password">
          Forgot password?
        </Link>
        <br />
        <button type="submit">Submit</button>
      </form>
      <Link className={classes.register} to={"/register"}>
        Create an account?
      </Link>
    </section>
  );
}

export default Login;

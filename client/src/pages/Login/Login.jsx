import React from 'react'
import { useRef,useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from '../../utils/Api'
import classes from './Login.module.css'
//import VisibilityIcon from "@mui/icons-material/Visibility";
//import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function Login() {
//  const navigate =useNavigate()
const emailDom=useRef()
const passwordDom=useRef()
const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

async function handleSubmit(e) {
    e.preventDefault();

const emailValue =emailDom.current.value;
const passValue =passwordDom.current.value;
if (!emailValue || !passValue
){
  alert ('please provide all required information');
  return;
}
    try {

      const {data} = await axios.post('/users/login',{
        
        email: emailValue,
        password:passValue,
});
      alert ('login successful. please login')
      localStorage.setItem("token",data.token);
      //navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      alert (error?.response?.data?.msg|| "Login failed. please check your credentials and try again ");
     }
 
  }
  return (
    <section className={classes.section}>
<form className={classes.form} onSubmit={handleSubmit}    >

<div className={classes.email}>
 <h3>Login to your account</h3>
 <p>Don't have an account? <small>Create a new account</small></p>

  <input ref={emailDom} type ='text' 
  placeholder='Email addres'/>
</div>
<br />
<div style={{ position: "relative" }}>
          <input
            ref={passwordDom}
            type={showPassword ? "text" : "password"}
            placeholder="Your Password"
            
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
            {/* {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />} */}
          </span>
        </div>
<br />
<button className={classes.submit}type ='submit'>Login</button>
<div className={classes.create}>
  <small>create an account?</small>
</div>

</form>
{/* <Link to ={"/register"}>register</Link> */}
</section>
  )
}

export default Login
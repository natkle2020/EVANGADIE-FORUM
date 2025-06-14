import React, { useContext, useRef, useState } from 'react';
import styles from './AuthPage.module.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios'
import { Type } from '../../utils/action'
import { Context } from '../../Components/Context';
import About from './About'

function AuthPage() {
  const[islogin,setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [error , setError] = useState(null)
  const [{user}, dispatch] = useContext(Context)

  //Sign Up
  const emailRef =useRef(null)
  const passwordRef = useRef(null)
  const first_nameRef= useRef(null)
  const last_nameRef = useRef(null)
  const usernameRef = useRef(null)
  //Login
  const emailLoginRef = useRef(null)
  const passwordLoginRef = useRef(null)


  //Sign Up Function
async function signup(e) {
  e.preventDefault()
  try {
    setError(null)
    const result = await axios.post('/auth/register', {
      email : emailRef.current.value,
      password : passwordRef.current.value,
      first_name : first_nameRef.current.value,
      last_name : last_nameRef.current.value,
      username : usernameRef.current.value
    })
    setIsLogin((prev) => !prev)
    } catch (error) {
    setError(error.response.data.message)
    console.log(error)
  }
}
//Log in Function
async function login(e) {
  e.preventDefault()
  try {
    setError(null)
    const result = await axios.post('/auth/login', {
      email : emailLoginRef.current.value,
      password : passwordLoginRef.current.value })
      
    const token = result?.data?.token
    const username = result?.data?.user.username
    const user_id = result?.data?.user?.user_id
    localStorage.setItem("token", token)
    localStorage.setItem("username", username )
    localStorage.setItem("user_id", user_id )
    const response = await axios.get('/auth/checkUser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const userInfo = response?.data?.user
        await dispatch({
          type : Type.SET_USER,
          user : userInfo
        })
        navigate('/')
  } catch (error) {
    console.log(error)
    setError(error?.response?.data?.message)
  }
}
function handleShowPassword() {
    setShowPassword((prev)=> !prev)
}
function toggler(e){
  e.preventDefault()
  setIsLogin((prev) => !prev)
 }
  return (
    <div className={styles.login}>

      {
        islogin ? (
           <div className={styles.formCard}>
        <h3>Login to your account</h3>
        <p className={styles.registerText}>
          Don’t have an account? <a href="#" onClick={toggler}>Create a new account</a>
        </p>
        <form onSubmit={login}>
          <input ref={emailLoginRef} type="email" placeholder="Your Email" required/>
          <input className={styles.password} ref={passwordLoginRef}  type={showPassword ? 'text' : 'password'} placeholder="Your Password" required/>
          <p className={styles.eye} onClick={handleShowPassword}>{showPassword ? `👀` : '👁️‍🗨️'}</p>
          {
              error && <p className={styles.error}>{error}!!!</p>
           }
          <button type="submit">Submit</button>
        </form>
        <Link className={styles.createAccount} href="#" onClick={toggler}>Create an account?</Link>
       
      </div>
        ) : 
       <div className={styles.formCard}>        
        <h3>Create account</h3>
        <p className={styles.registerText}>
          Already have an account? <Link href="#" onClick={toggler}>Sign in </Link>
        </p>
        <form onSubmit={signup}>
          <input ref={emailRef} type="email" placeholder="Your Email" />
          <div className={styles.nameContainer}>
            <input ref={first_nameRef} type="name" placeholder="First Name" />
            <input ref={last_nameRef} type="name" placeholder="Last Name" />
          </div>
            <input ref={usernameRef} type="text" placeholder="Username" />
          <input ref={passwordRef} type="password" placeholder="Your Password" />
          
          {
            error && <p className={styles.error}>{error}!!!</p>
          }
          <button type="submit">Submit</button>

        </form>

      </div>
      }
     
      <About />

     
    </div>
  );
}

export default AuthPage;

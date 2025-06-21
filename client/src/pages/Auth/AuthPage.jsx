import React, {  useState } from 'react';
import styles from './AuthPage.module.css'

import About from './About'
import Login from './Login';
import SignUp from './SignUp';

function AuthPage() {
  const[islogin,setIsLogin] = useState(true)
//  Updated upstream



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
//  Stashed changes
function toggler(e){
  e.preventDefault()
  setIsLogin((prev) => !prev)
 }
  return (
    <div className={styles.login}>

      {
        islogin ?
        <Login toggler={toggler} /> : <SignUp  toggler={toggler}/>
           
     
      }
     
      <About />

     
    </div>
  );
}

export default AuthPage;

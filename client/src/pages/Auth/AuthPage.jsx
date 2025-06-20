import React, {  useState } from 'react';
import styles from './AuthPage.module.css'

import About from './About'
import Login from './Login';
import SignUp from './SignUp';

function AuthPage() {
  const[islogin,setIsLogin] = useState(true)




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

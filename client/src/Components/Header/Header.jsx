import React from "react";
import {useNavigate} from 'react-router-dom'
import evangadi_logo from '../../assets/evangadi-logo.png'
import styles from './Header.module.css'
import {Link} from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { useContext } from "react";
import { Context } from "../Context";
import { Type } from "../../utils/action";
const Header = () => {
  const navigate = useNavigate();
 const [{user}, dispatch]=useContext(Context)

 async function signout() {
    if(user){
    try {
           await dispatch({
               type : Type.SET_USER,
               user : null
           })
           localStorage.removeItem('token')        
           localStorage.removeItem('username')        
           localStorage.removeItem('user_id')
           navigate('/auth')        
          } catch (error) {
            console.log(error)
          }
        }
        }

  return (
   <header>
         <div className={styles.left}>
           <Link to="/">
              <img src={evangadi_logo} alt="Evangadi Logo" />
            </Link>
         </div>
         <div className={styles.right}>
           <Link to="/">
              <p>Home</p>
           </Link>
           <Link to={'/howitwork'}><p>How it works</p></Link>
           <Link onClick={signout} to={!user && '/auth'}> <button>{user ? 'Log Out!' : 'Sign In'}</button> </Link>
            <div className={styles.user}>
             <Link to={'/profile'}>
             <FaUserCircle size={32} />
             <p className={`${styles.icon} ${user ? styles.green : styles.red}`}>{" "}</p>
             </Link>
           </div>
         </div>
       </header>
  );
};

export default Header;

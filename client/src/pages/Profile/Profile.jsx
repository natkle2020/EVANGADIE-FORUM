import React, { useContext } from 'react';
import css from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import verified from '../../assets/verified.png'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Components/Context';
import { Type } from '../../utils/action';
function Profile() {
   const navigate =  useNavigate()
  const [{ user }, dispatch] = useContext(Context);
  const [question, setQuestion] = useState([])
  const token = localStorage.getItem('token');
  const {
    username,
    first_name,
    last_name,
    email,
    user_id
  } = user || {};

  async function signout() {
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
  const initials = `${first_name?.[0] ?? ''}${last_name?.[0] ?? ''}`.toUpperCase();


  return (
    <div className={css.profile}>

    <div className={css.container}>
      <div className={css.infoSection}>
        <ul>
          <li><strong>Full Name:</strong> {first_name} {last_name}</li>
          <li><strong>Username:</strong> {username}</li>
          <li><strong>Email:</strong> {email}</li>
          <li><strong>User ID:</strong> {user_id}</li>
        </ul>
      <button className={css.signout} onClick={signout}>Sign Out</button>
      </div>
      <div className={css.avator_container}>
      <p>{" "}</p>
      <div className={css.avatar}>
        {initials}
      </div>
      </div>
      <img className={css.verified} src={verified} alt="" />
    </div>
    <div className={css.activity}>
 </div>
    </div>
  );
}

export default Profile;

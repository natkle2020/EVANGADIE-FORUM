import React, { useContext, useEffect } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import AuthPage from './Pages/Auth/AuthPage'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Answer from './Pages/Answer/Answer'
import axios from './utils/axios'
import { Type } from './utils/action'
import { Context } from './Components/Context'
import AskQuestion from './Pages/AskQuestion/AskQuestion'
import Howitwork from './Pages/Howitwork/Howitwork'
import Protected from './Components/Protected'
import Profile from './Pages/Profile/Profile'
function Router() {
  const navigate = useNavigate()
  const [{user}, dispatch] = useContext(Context)

   useEffect(()=>{
      (async () => {
         await checkUser()
      })()
   },[])
 
 async function checkUser() {
   const token = localStorage.getItem("token");
   const username = localStorage.getItem("username");
   const user_id = localStorage.getItem("user_id");
   if (!token || !username || !user_id) {
     dispatch({ type: Type.SET_USER, user: null });
     navigate("/auth");
     return;
   }
   try {
     const res = await axios.get("/auth/checkUser", {
       headers: { Authorization: `Bearer ${token}` },
     })
     dispatch({
       type: Type.SET_USER,
       user: res?.data?.user || null,
     })
   } catch (error) {
     console.error(error?.response?.data || error.message);
     dispatch({ type: Type.SET_USER, user: null });
     navigate("/auth")
   }
 }
 

  return (
    <>
    <Header />
      <Routes>
            <Route path="/" element={<Protected><HomePage /></Protected>} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/answer/:qid" element={<Protected><Answer /></Protected>} />
            <Route path="/askquestion" element={<Protected><AskQuestion /></Protected>} />
            <Route path='/howitwork' element={<Howitwork />}/>   
            <Route path='/profile' element={<Protected><Profile /></Protected>}/>
                  
        </Routes>
    <Footer />
    </>
  )
}

export default Router

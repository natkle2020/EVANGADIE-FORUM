// import React, { useContext, useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import AuthPage from './pages/Auth/AuthPage'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Answer from './Pages/Answer/Answer'
import AskQuestion from './Pages/AskQuestion/AskQuestion'
import Howitwork from './Pages/Howitwork/Howitwork'
import Protected from './Components/Protected'
import Profile from './Pages/Profile/Profile'


function Router() {

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

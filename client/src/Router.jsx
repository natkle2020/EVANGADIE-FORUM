// import React, { useContext, useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import AuthPage from './pages/Auth/AuthPage'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Answer from './Pages/Answer/Answer'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import Howitwork from './Pages/Howitwork/Howitwork'
import Protected from './Components/Protected'
import Profile from './Pages/Profile/Profile'
import EditQuestion from "./pages/EditQuestion/EditQuestion";

function Router() {

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/answer/:qid"
          element={
            <Protected>
              <Answer />
            </Protected>
          }
        />
        <Route
          path="/askquestion"
          element={
            <Protected>
              <AskQuestion />
            </Protected>
          }
        />
        <Route path="/howitwork" element={<Howitwork />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="/editquestion/:question_id" element={<EditQuestion />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Router

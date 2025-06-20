import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage.jsx'
import AuthPage from './pages/Auth/AuthPage'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Answer from './Pages/Answer/Answer.jsx'
import AskQuestion from './Pages/AskQuestion/AskQuestion'
import Howitwork from './Pages/Howitwork/Howitwork'
import Protected from './Components/Protected'
import Profile from './pages/Profile/Profile.jsx'
import { Spinner } from 'react-bootstrap';
import { useContext } from 'react'
import { Context } from './Components/Context'



function Router() {

  const [{loading}] = useContext(Context);

  //So Here We Used loading spinner while checking auto-login
  if (loading) {
    return (
          <div className= 'loadingContainer'>
            <Spinner animation="border" variant="warning"  size="lg" />
          </div>
        );
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

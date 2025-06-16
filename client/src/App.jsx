<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
const App = () => {
  return <></>;
};

export default App;
=======
import React from 'react'
import Router from './Router'
import ContextProvider from './Components/Context'

function App() {
  return (
    <>
    <ContextProvider>
      <Router/>
    </ContextProvider>
    </>
  )
}

export default App
>>>>>>> 285e458c015b52ef64e385d0d321849a93c77fdb

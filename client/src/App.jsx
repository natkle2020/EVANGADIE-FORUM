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


import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sandbox from './components/Sandbox.jsx'
import Play from './components/Play.jsx'

function App() {

  return (
    <>
      <header>
        Header
        <nav>Nav</nav>
      </header>
      <main>
        Main
        <Sandbox />
        {/* <Routes>
        </Routes> */}
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App

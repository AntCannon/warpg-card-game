import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Field from './components/Field.jsx'

function App() {

  return (
    <>
      <header>
        Header
        <nav>Nav</nav>
      </header>
      <main>
        <Field />
        {/* <Routes>
        </Routes> */}
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App

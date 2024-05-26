import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Hero from './Hero.jsx'
import Hook from './Hook.jsx'
import Field from './components/Field.jsx'

function App() {

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Hook />
        <Field />
        {/* <Routes>
        </Routes> */}
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App

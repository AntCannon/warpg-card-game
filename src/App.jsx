import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Hook from './components/Hook.jsx'
import Mechanics from './components/Mechanics.jsx'
import Field from './components/Field.jsx'

function App() {

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Hook />
        <Mechanics />
        {/* <Field /> */}
        {/* <Routes>
        </Routes> */}
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App

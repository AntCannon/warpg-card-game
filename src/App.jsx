import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Hook from './components/Hook.jsx'
import Mechanics from './components/Mechanics.jsx'
import HowToPlay from './components/HowToPlay.jsx'
import Footer from './components/Footer.jsx'
import Field from './components/Field.jsx'

function App() {

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Hook />
        <Mechanics />
        <HowToPlay />
        {/* <Field /> */}
        {/* <Routes>
        </Routes> */}
      </main>
      <Footer />
    </>
  )
}

export default App

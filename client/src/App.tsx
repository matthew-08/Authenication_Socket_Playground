import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import { ToggleColorMode } from './components/ToggleColorMode'
import SignUp from './components/SignUp'
import { PetForm } from './components/PetForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div className="App">
      <ToggleColorMode/>
      <Routes>
      <Route
      path='/'
      element={<SignIn/>}
      />
        <Route
      path='/register'
      element={<SignUp/>}
      />
      <Route
      path='*'
      element={<SignIn/>}
      />
      <Route
      path='/test'
      element={<PetForm/>}
      />


      </Routes>
    </div>
    </Router>
  )
}

export default App

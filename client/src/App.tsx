import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div className="App">
      <Routes>

      <Route
      path='/'
      element={<SignIn/>}
      >

      </Route>
      </Routes>
    </div>
    </Router>
  )
}

export default App

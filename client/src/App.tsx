import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SignIn from './components/SignIn'
import { ToggleColorMode } from './components/ToggleColorMode'
import SignUp from './components/SignUp'
import { PetForm } from './components/PetForm'
import { Chat } from './components/Chat'
import { Profile } from './components/Profile'
import PrivateRoutes from './components/PrivateRoutes'
import UserContext from './components/AccountContext'
import { useContext } from 'react'
import { AccountContext } from './components/AccountContext'

function App() {
  const [count, setCount] = useState(0)
  
  const {user} = useContext(AccountContext)

  return (
    <Router>
      <UserContext>
    <div className="App">
    <Link to='/profile'>Proteced route</Link>
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
      <Route element={
      <PrivateRoutes 
      />}>
        <Route
        path='/chat'
        element={<Chat/>}
        />
        <Route
        path='/profile'
        element={<Profile/>}
        />
      </Route>

      </Routes>
    </div>
    </UserContext>
    </Router>
  )
}

export default App

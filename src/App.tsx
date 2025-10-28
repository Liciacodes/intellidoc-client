
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App

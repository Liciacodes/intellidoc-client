
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Dashboard from './pages/Dashboard/Dashboard'

import MyDocument from './pages/Dashboard/MyDocument'
import DashboardLayout from './components/layout/DashboardLayout'
import AiTools from './pages/Dashboard/AiTools'
import Settings from './pages/Dashboard/Settings/Settings'
import ProfileSettings from './pages/Dashboard/Settings/ProfileSettings'
import ResetPassword from './pages/Auth/ResetPassword'

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        
        <Route path='/dashboard' element={<DashboardLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='my-document' element={<MyDocument/>}/>
        <Route path='ai-tools' element={<AiTools/>}/>
        <Route path='settings' element={<Settings/>}/>
        <Route path='profile' element={<ProfileSettings/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App

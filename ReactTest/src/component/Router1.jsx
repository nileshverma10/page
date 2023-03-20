import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Navbar from './Navbar'
import Private from './Private'
import Logout from './Logout'


const Router1 = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route element={<Private/>}>
            <Route exact path="/home" element={<Home/>}/>    
            <Route exact path="/logout" element={<Logout />} />
            </Route>
            <Route exact path="/login" element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default Router1
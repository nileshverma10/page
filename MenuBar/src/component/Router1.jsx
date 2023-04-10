import React from 'react'
import {Router,Route} from 'react-router-dom'
import Navbar from './Navbar';
import Home from './Home';
import Menu from './Menu';
import About from './About';
import Skills from './Skills';


const Router1 = () => {
  return (
    <div>
       <Navbar/>
       <Router>
         <Route exact path="/" element={<Home/>}/>
         <Route exact path ="/menu" element={<Menu/>}/>
         <Route exact path ="/about" element={<About/>}/>
         <Route exact path ="/skills" element={<Skills/>}/>
       </Router> 
    </div>
  )
}

export default Router1

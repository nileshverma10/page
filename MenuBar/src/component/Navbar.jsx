import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className='navbar'>
        <h3 className='logo'>Logo</h3>
            <ul className='nav-links'>
           <li><Link to ="/">Home</Link></li>
           <li><Link to ="/menu">Menu</Link></li>
           <li><Link to ="/about">About</Link></li>
           <li><Link to ="/skills">Skills</Link></li>
            </ul>
    </nav>
  )
}

export default Navbar

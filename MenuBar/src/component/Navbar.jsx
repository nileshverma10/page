import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
    const [mobile,setMobile] = useState(false)
  return (
    <nav className='navbar'>
        <h3 className='logo'>Logo</h3>
            <ul className='nav-links'>
           <li><Link to ="/">Home</Link></li>
           <li><Link to ="/menu">Menu</Link></li>
           <li><Link to ="/about">About</Link></li>
           <li><Link to ="/skills">Skills</Link></li>
            </ul>
            <button className='mobile'>
                {mobile ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
            </button>
    </nav>
  )
}

export default Navbar

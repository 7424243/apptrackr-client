import React from 'react'
import {NavLink} from 'react-router-dom'
import './NavBar.css'

//NavLink = activeStyle attribute

function NavBar() {
    return (
        <nav>
            <NavLink className='header_navlink' to='/jobapps'>Summary</NavLink>
            <NavLink className='header_navlink' to='resources'>Resources</NavLink>
            <NavLink className='header_navlink' to='/login'>Login</NavLink>
        </nav>
    )
}

export default NavBar
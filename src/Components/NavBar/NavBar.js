import React from 'react'
import {NavLink} from 'react-router-dom'
import './NavBar.css'

//NavLink = activeStyle attribute

function NavBar() {
    return (
        <nav>
            <NavLink to='/jobapps'>Summary </NavLink>
            <NavLink to='resources'>Resources</NavLink>
            <NavLink to='/login'>Login</NavLink>
        </nav>
    )
}

export default NavBar
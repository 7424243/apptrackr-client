import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'

function NavBar() {
    return (
        <nav>
            <Link to='/jobapps'>Summary </Link>
            <Link to='resources'>Resources</Link>
            <Link to='/jobapps'>Logout</Link>
        </nav>
    )
}

export default NavBar
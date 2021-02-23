import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import './Header.css'

function Header() {
    return (
        <div>
            <Link to='/'><h1>apptrackr</h1></Link>
            <NavBar/>
        </div>
    )
}

export default Header
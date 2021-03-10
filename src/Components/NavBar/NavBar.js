import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import ApptrackrContext from '../../ApptrackrContext'
import TokenService from '../../services/token-service'
import './NavBar.css'

//NavLink = activeStyle attribute

class NavBar extends Component {

    state = {
        isLoggedIn: true,
    }

    static contextType = ApptrackrContext

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.setState({isLoggedIn: false})
    }

    logoutLink() {
        return (
            <NavLink className='header_navlink' to='/' onClick={this.handleLogoutClick}>Logout</NavLink>
        )
    }

    loginLink() {
        return (
            <NavLink className='header_navlink' to='/login'>Login</NavLink>
        )
    }
    render() {
        return (
            <nav>
                {TokenService.hasAuthToken() ? <NavLink className='header_navlink' to='/jobapps'>Summary</NavLink> : null}
                {TokenService.hasAuthToken() ? <NavLink className='header_navlink' to='resources'>Resources</NavLink> : null}
                {TokenService.hasAuthToken() ? this.logoutLink() : this.loginLink()}
            </nav>
        )
    }

}

export default NavBar
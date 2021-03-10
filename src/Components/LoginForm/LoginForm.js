import React, {Component} from 'react'
import ApptrackrContext from '../../ApptrackrContext'
import RecButton from '../RecButton/RecButton'
import config from '../../config'
import TokenService from '../../services/token-service'
import {Link} from 'react-router-dom'
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types'
import './LoginForm.css'

class LoginForm extends Component {

    state = {
        user_name: '',
        password: '',
        error: null,
        loading: false
    }

    static contextType = ApptrackrContext

    handleSubmitJwtAuth = e => {
        e.preventDefault()
        this.setState({loading: true})
        fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
                this.context.onLoginSuccess()
                this.setState({loading: false})
                this.props.history.push('/jobapps')
            })
            .catch(err => {
                this.setState({loading: false})
                this.setState({error: err.error})
                console.error({err})
            })
    }

    handleUsername = e => {
        this.setState({user_name: e.target.value})
    }

    handlePassword = e => {
        this.setState({password: e.target.value})
    }

    validateUserName() {
        const userName = this.state.user_name.trim()
        if(userName.length === 0) {
            return 'A username is required'
        }
    }

    validatePassword() {
        const password = this.state.password.trim()
        if(password.length === 0) {
            return 'A password is required and must be more than 8 characters and less than 72 characters'
        }
    }

    render() {
        const {loading} = this.state
        return (
            <div className='login_container'>
                <form 
                    className='login_form'
                    onSubmit={this.handleSubmitJwtAuth}
                >
                    <h2>Login</h2>
                    <p>* Required</p>
                    <section className='login_section'>*
                        <input 
                            className='login_input'
                            type='text'
                            aria-label='login username'
                            placeholder='username'
                            autoComplete='on'
                            required
                            onChange={this.handleUsername}
                        />
                        {this.state.user_name && <ValidationError message={this.validateUserName()}/>}
                    </section>
                    <section className='login_section'>*
                        <input 
                            className='login_input'
                            type='password' 
                            aria-label='login password'
                            placeholder='password'
                            autoComplete='on'
                            required
                            onChange={this.handlePassword}
                        />
                        {this.state.password && <ValidationError message={this.validatePassword()}/>}
                    </section>
                    <RecButton type='submit'>Login</RecButton>
                    {loading ? <div className="lds-ripple"><div></div><div></div></div> : null}
                    <Link to='/signup' className='login_link'>
                        <RecButton>Sign Up</RecButton>
                    </Link>
                </form>
                {this.state.error && <p className='login_error'>{this.state.error}. Please try again, or Sign Up for an account.</p>}
                <div className='demo_creds'>
                    <p>Demo Credentials:</p>
                    <p>Username: demo</p>
                    <p>Password: Demo1234!</p>
                </div>
            </div>
        )
    }
}

export default LoginForm

LoginForm.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
}
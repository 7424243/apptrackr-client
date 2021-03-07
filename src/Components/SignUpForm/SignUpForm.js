import React, {Component} from 'react'
import ApptrackrContext from '../../ApptrackrContext'
import config from '../../config'
import TokenService from '../../services/token-service'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import RecButton from '../RecButton/RecButton'
import ValidationError from '../ValidationError/ValidationError'
import './SignUpForm.css'

class SignUpForm extends Component {

    state = {
        full_name: '',
        user_name: '',
        password: '',
        error: null
    }

    static contextType = ApptrackrContext

    handleSubmit = e => {
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/users/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(() => {
                const {user_name, password} = this.state
                const loginCreds = {user_name, password}
                //automatically login after signing up
                return fetch(`${config.API_ENDPOINT}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(loginCreds)
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
                        this.props.history.push('/jobapps')
                    })
                    .catch(err => {
                        this.setState({error: err.error})
                        console.error({err})
                    })
            })
            .catch(err => {
                this.setState({error: err.error.message})
                console.error({err})
            })
    }

    handleAddFullName = e => {
        this.setState({full_name: e.target.value})
    }

    handleAddUserName = e => {
        this.setState({user_name: e.target.value})
    }

    handleAddPassword = e => {
        this.setState({password: e.target.value})
    }

    validateFullName() {
        const fullName = this.state.full_name.trim()
        if(fullName.length === 0) {
            return 'A full name is required'
        }
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
            return 'A password is required'
        }
    }

    render() {
        return (
            <div className='signup_container'>
                <ErrorBoundary>
                    <form 
                        className='signup_form'
                        onSubmit={this.handleSubmit}
                    >
                        <h2>Sign Up Form</h2>
                        <p>* Required</p>
                        <section className='signup_input'>*
                            <input 
                                type='text' 
                                placeholder='Full Name'
                                autoComplete='off'
                                required
                                onChange={this.handleAddFullName}
                            />
                            {this.state.full_name && <ValidationError message={this.validateFullName()}/>}
                        </section>
                        <section className='signup_input'>*
                            <input 
                                type='text'
                                placeholder='Username'
                                autoComplete='off'
                                required
                                onChange={this.handleAddUserName}
                            />
                            {this.state.user_name && <ValidationError message={this.validateUserName()}/>}                        
                        </section>
                        <section className='signup_input'>*

                            <input 
                                type='password' 
                                placeholder='Password'
                                autoComplete='off'
                                required
                                onChange={this.handleAddPassword}
                            /> 
                            <p className='password_reqs'>* {'>'} 8 characters</p> 
                            <p className='password_reqs'>* at least 1 upper case</p>
                            <p className='password_reqs'>* at least 1 upper case</p>
                            <p className='password_reqs'>* at least 1 lower case</p>
                            <p className='password_reqs'>* at least 1 number</p>
                            <p className='password_reqs'>* at least 1 special character</p>     
                            {this.state.password && <ValidationError message={this.validatePassword()}/>}                  
                        </section>
                            <RecButton type='submit'>Sign Up</RecButton>
                    </form>
                    {this.state.error && <p className='signup_error'>{this.state.error}</p>}
                </ErrorBoundary>
                
            </div>
        )
    }
}

export default SignUpForm
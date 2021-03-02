import React, {Component} from 'react'
import ApptrackrContext from '../../ApptrackrContext'
import config from '../../config'
import TokenService from '../../services/token-service'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import RecButton from '../RecButton/RecButton'
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

    render() {
        return (
            <div className='signup_container'>
                <ErrorBoundary>
                    <form 
                        className='signup_form'
                        onSubmit={this.handleSubmit}
                    >
                        <h2>Sign Up Form</h2>
                        <section className='signup_input'>*
                            <input 
                                type='text' 
                                placeholder='Full Name'
                                autoComplete='off'
                                required
                                onChange={this.handleAddFullName}
                            />
                        </section>
                        <section className='signup_input'>*
                            <input 
                                type='text'
                                placeholder='Username'
                                autoComplete='off'
                                required
                                onChange={this.handleAddUserName}
                            />                        
                        </section>
                        <section className='signup_input'>
                            <p>* Must be at least 8 characters long and contain at least 1 upper case, 1 lower case, 1 number, and 1 special character.</p>
                            <input 
                                type='password' 
                                placeholder='Password'
                                autoComplete='off'
                                required
                                onChange={this.handleAddPassword}
                            />                        
                        </section>
                            <RecButton type='submit'>Sign Up</RecButton>
                    </form>
                    {this.state.error && <p>{this.state.error}</p>}
                </ErrorBoundary>
                
            </div>
        )
    }
}

export default SignUpForm
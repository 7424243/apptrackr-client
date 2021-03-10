import React, {Component} from 'react'
import ApptrackrContext from '../../ApptrackrContext'
import config from '../../config'
import TokenService from '../../services/token-service'
import RecButton from '../RecButton/RecButton'
import ValidationError from '../ValidationError/ValidationError'
import './SignUpForm.css'
import PropTypes from 'prop-types'

class SignUpForm extends Component {

    state = {
        full_name: '',
        user_name: '',
        password: '',
        error: null,
        loading: false
    }

    static contextType = ApptrackrContext

    handleSubmit = e => {
        e.preventDefault()
        this.setState({loading: true})
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
                        this.setState({loading: false})
                        this.props.history.push('/jobapps')
                    })
                    .catch(err => {
                        this.setState({loading: false})
                        this.setState({error: err.error})
                        console.error({err})
                    })
            })
            .catch(err => {
                this.setState({loading: false})
                this.setState({error: err.error.message})
                console.error({err})
            })
        setTimeout(() => {
            this.setState({loading: false})
        }, 2000)
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
        const {loading} = this.state
        return (
            <div className='signup_container'>
                
                    <form 
                        className='signup_form'
                        onSubmit={this.handleSubmit}
                    >
                        <h2>Sign Up Form</h2>
                        <p>* Required</p>
                        <section className='signup_section'>* 
                            <input 
                                className='signup_input'
                                type='text'
                                aria-label='signup full name'
                                placeholder='Full Name'
                                autoComplete='off'
                                required
                                onChange={this.handleAddFullName}
                            />
                            {this.state.full_name && <ValidationError message={this.validateFullName()}/>}
                        </section>
                        <section className='signup_section'>*
                            <input 
                                className='signup_input'
                                type='text'
                                aria-label='signup username'
                                placeholder='Username'
                                autoComplete='off'
                                required
                                onChange={this.handleAddUserName}
                            />
                            {this.state.user_name && <ValidationError message={this.validateUserName()}/>}                        
                        </section>
                        <section className='signup_section'>*
                            <input 
                                className='signup_input'
                                type='password' 
                                aria-label='signup password'
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
                            {loading ? <div className="lds-ripple"><div></div><div></div></div> : null}
                    </form>
                    {this.state.error && <p className='signup_error'>{this.state.error}</p>}
                
                
            </div>
        )
    }
}

export default SignUpForm

SignUpForm.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
}
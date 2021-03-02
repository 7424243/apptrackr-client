import React, {Component} from 'react'
import ApptrackrContext from '../../ApptrackrContext'
import RecButton from '../RecButton/RecButton'
import './LoginForm.css'
import config from '../../config'
import TokenService from '../../services/token-service'
import { Link } from 'react-router-dom'

class LoginForm extends Component {

    state = {
        user_name: '',
        password: '',
        error: null
    }

    static contextType = ApptrackrContext

    handleSubmitJwtAuth = e => {
        e.preventDefault()
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
                this.props.history.push('/jobapps')
            })
            .catch(err => {
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

    render() {
        return (
            <div className='login_container'>
                <form 
                    className='login_form'
                    onSubmit={this.handleSubmitJwtAuth}
                >
                    <h2>Login Form</h2>
                    <section className='login_input'>
                        <input 
                            type='text'
                            placeholder='username'
                            autoComplete='on'
                            required
                            onChange={this.handleUsername}
                        />
                    </section>
                    <section className='login_input'>
                        <input 
                            type='text' 
                            placeholder='password'
                            autoComplete='on'
                            required
                            onChange={this.handlePassword}
                        />
                    </section>
                    <RecButton type='submit'>Login</RecButton>
                    <Link to='/signup' className='login_link'>
                        <RecButton>Sign Up</RecButton>
                    </Link>
                </form>
                {this.state.error && <p>{this.state.error}. Please try again, or Sign Up for an account.</p>}
                <div className='demo_creds'>
                    <p>**Demo Credentials:</p>
                    <p>Username: demo</p>
                    <p>Password: Demo1234!</p>
                </div>
            </div>
        )
    }
}

export default LoginForm
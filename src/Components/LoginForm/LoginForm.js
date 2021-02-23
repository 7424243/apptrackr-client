import React, {Component} from 'react'
import RecButton from '../RecButton/RecButton'
import './LoginForm.css'

class LoginForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <h2>Login Form</h2>
                    <input 
                        type="text" 
                        placeholder="username"
                    />
                    <input 
                        type="text" 
                        placeholder="password"
                    />
                </form>
                <RecButton content={'Login'} path={'/jobapps'} />
                <RecButton content={'Sign Up'} path={'/signup'} />
            </div>
        )
    }
}

export default LoginForm
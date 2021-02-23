import React, {Component} from 'react'
import RecButton from '../RecButton/RecButton'
import './SignUpForm.css'

class SignUpForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <h2>Sign Up Form</h2>
                    <input 
                        type="text" 
                        placeholder="First Name"
                    />
                    <input 
                        type="text"
                        placeholder="Last Name"
                    />
                    <input 
                        type="text" 
                        placeholder="Username"
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                    />
                </form>
                <RecButton content={'Sign Up'} path={'/jobapps'} />
            </div>
        )
    }
}

export default SignUpForm
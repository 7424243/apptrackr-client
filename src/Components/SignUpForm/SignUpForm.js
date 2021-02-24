import React, {Component} from 'react'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import RecButton from '../RecButton/RecButton'
import './SignUpForm.css'

class SignUpForm extends Component {
    render() {
        return (
            <div>
                <ErrorBoundary>
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
                </ErrorBoundary>
                <RecButton content={'Sign Up'} path={'/jobapps'} />
            </div>
        )
    }
}

export default SignUpForm
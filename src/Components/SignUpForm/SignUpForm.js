import React, {Component} from 'react'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import RecButton from '../RecButton/RecButton'
import './SignUpForm.css'

class SignUpForm extends Component {
    render() {
        return (
            <div className='signup_container'>
                <ErrorBoundary>
                    <form className='signup_form'>
                        <h2>Sign Up Form</h2>
                        <section className='signup_input'>
                            <input 
                                type="text" 
                                placeholder="First Name"
                            />
                        </section>
                        <section className='signup_input'>
                            <input 
                                type="text"
                                placeholder="Last Name"
                            />                            
                        </section>
                        <section className='signup_input'>
                            <input 
                                type="text" 
                                placeholder="Username"
                            />                        
                        </section>
                        <section className='signup_input'>
                            <input 
                                type="password" 
                                placeholder="Password"
                            />                        
                        </section>
                            <RecButton content={'Sign Up'} path={'/jobapps'} />
                    </form>
                </ErrorBoundary>
                
            </div>
        )
    }
}

export default SignUpForm
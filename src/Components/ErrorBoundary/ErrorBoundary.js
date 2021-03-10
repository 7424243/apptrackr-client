import React, {Component} from 'react'
import './ErrorBoundary.css'
import PropTypes from 'prop-types'

class ErrorBoundary extends Component {

    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true, error
        }
    }

    render() {
        if(this.state.hasError) {
            return <h2 className='error-boundary-heading'>Something went wrong, unable to display at this time.</h2>
        } else {
            return this.props.children
        }
    }
}

export default ErrorBoundary

ErrorBoundary.propTypes = {
    children: PropTypes.element.isRequired
}
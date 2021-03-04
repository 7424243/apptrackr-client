import React, {Component} from 'react'
import { isWebUri } from 'valid-url'
import ApptrackrContext from '../../ApptrackrContext'
import config from '../../config'
import TokenService from '../../services/token-service'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import SquareButton from '../SquareButton/SquareButton'
import ValidationError from '../ValidationError/ValidationError'
import './NewResourceForm.css'

class NewResourceForm extends Component {

    state = {
        resource_name: '',
        resource_url: '',
        type: '',
        user_id: -1,
        error: null
    }

    static contextType = ApptrackrContext

    componentDidMount() {
        this.setState({user_id: this.context.user_id})
    }


    handleSubmit = e => {
        e.preventDefault()
        let payload = Object.assign({}, this.state)
        fetch(`${config.API_ENDPOINT}/resources/`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(data => {
                this.context.addResource(data)
                this.props.history.push('/resources')
            })
            .catch(error => {
                this.setState({error})
                console.error({error})
            })
    }

    addResourceName = e => {
        this.setState({resource_name: e.target.value})
    }

    addResourceUrl = e => {
        this.setState({resource_url: e.target.value})
    }

    addResourceType = e => {
        this.setState({type: e.target.value})
    }

    validateResourceName() {
        const resourceName = this.state.resource_name.trim()
        if(resourceName.length === 0) {
            return 'A resource name is required'
        }
    }

    validateResourceUrl() {
        const url = this.state.resource_url.trim()
        if(!isWebUri(url)) {
            return 'A valid URL is required'
        }
    }

    validateResourceStatus() {
        const status = this.state.status.trim()
        if(status !== 'Job Resource' || status !== 'Other Resource') {
            return `A status of 'Job Resource' or 'Other Resource' is required`
        }
    }

    render() {
        return (
            <div className='resourceform_container'>
                <h2 className='resourceform_header'>New Resource</h2>
                <ErrorBoundary>
                    <form 
                        className='resourceform_form'
                        onSubmit={this.handleSubmit}
                    >
                        <section className='resourceform_input'>
                            <input 
                                type='text'
                                aria-label='name'
                                name='resource name'
                                placeholder='Resource Name'
                                required
                                onChange={this.addResourceName}    
                            />
                            {this.state.resource_name && <ValidationError message={this.validateResourceName()}/>}
                        </section>
                        <section className='resourceform_input'>
                            <input 
                                type='url'
                                aria-label='resource url'
                                name='url'
                                placeholder='Resource Link'
                                required
                                onChange={this.addResourceUrl}
                            />
                            {this.state.resource_url && <ValidationError message={this.validateResourceUrl()}/>}
                        </section>
                        <section className='resourceform_input'>
                            <label htmlFor='type'>Type: </label>
                            <select required onChange={this.addResourceType}>
                                <option name='type' value=''>Choose here</option>
                                <option name='type' value='Job Resource'>Job Resource</option>
                                <option name='type' value='Other Resource'>Other Resource</option>
                            </select>
                            {this.state.status && <ValidationError message={this.validateResourceStatus()}/>}
                        </section>
                        <SquareButton type='submit'>+</SquareButton>
                    </form>                    
                </ErrorBoundary>

            </div>
        )
    }
}

export default NewResourceForm
import React, {Component} from 'react'
import ApptrackrContext from '../../ApptrackrContext'
import SquareButton from '../SquareButton/SquareButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import './AppForm.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import TokenService from '../../services/token-service'
import {isWebUri} from 'valid-url'
import config from '../../config'
import ValidationError from '../ValidationError/ValidationError'

class AppForm extends Component {

    state = {
        job_name: '',
        company_name: '',
        website_url: '',
        date_applied: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        interview_date: '',
        status: '',
        notes: '',
        user_id: '',
        error: null
    }

    static contextType = ApptrackrContext

    componentDidMount() {
        this.setState({user_id: TokenService.getUserIdFromToken()})
    }

    handleSubmitAdd = e => {
        e.preventDefault()
        let payload = Object.assign({}, this.state)
        fetch(`${config.API_ENDPOINT}/applications/`, {
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
                this.context.addApplication(data)
                this.props.history.push('/jobapps')
            })
            .catch(error => {
                this.setState({error})
                console.error({error})
            })
    }

    handleSubmitEdit = e => {
        console.log('submit for edit!')
    }

    addJobName = e => {
        this.setState({job_name: e.target.value})
    }

    addCompanyName = e => {
        this.setState({company_name: e.target.value})
    }

    addWebsiteUrl = e => {
        this.setState({website_url: e.target.value})
    }

    addDateApplied = e => {
        this.setState({date_applied: e.target.value})
    }

    addContactName = e => {
        this.setState({contact_name: e.target.value})
    }

    addContactPhone = e => {
        this.setState({contact_phone: e.target.value})
    }

    addContactEmail = e => {
        this.setState({contact_email: e.target.value})
    }

    addInterviewDate = e => {
        this.setState({interview_date: e.target.value})
    }

    addStatus = e => {
        this.setState({status: e.target.value})
    }

    addNotes = e => {
        this.setState({ntoes: e.target.value})
    }

    validateJobName() {
        const jobName = this.state.job_name.trim()
        if(jobName.length === 0) {
            return 'A job name is required'
        }
    }

    validateCompanyName() {
        const companyName = this.state.company_name.trim()
        if(companyName.length === 0) {
            return 'A company name is required'
        }
    }

    validateWebsiteUrl() {
        const url = this.state.website_url.trim()
        if(!isWebUri(url)) {
            return 'A valid URL is required'
        }
    }

    render() {

        const applicationId = parseInt(this.props.match.params.id)
        const {applications} = this.context
        const getApp = (applications, applicationId) => 
            applications.find(application => application.id === applicationId)
        const appDetails = getApp(applications, applicationId)

        return (
            <div className='appform_container'>
                <h2 className='appform_header'>{appDetails ? 'Edit Job Application' : 'New Job Application'}</h2>
                <ErrorBoundary>
                    <form 
                        className='appform_form'
                        onSubmit={appDetails ? this.handleSubmitEdit : this.handleSubmitAdd}
                    >
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='job title'
                                name='job' 
                                defaultValue={appDetails ? appDetails.job_name : null} 
                                placeholder='Job Title'
                                required
                                onChange={this.addJobName}
                            />
                            {this.state.job_name && <ValidationError message={this.validateJobName()}/>}
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='company name'
                                name='company' 
                                defaultValue={appDetails ? appDetails.company_name : null} 
                                placeholder='Company Name'
                                required
                                onChange={this.addCompanyName}
                            />
                            {this.state.company_name && <ValidationError message={this.validateCompanyName()}/>}
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='url'
                                aria-label='website url'
                                name='website' 
                                defaultValue={appDetails ? appDetails.website : null} 
                                placeholder='Website'
                                onChange={this.addWebsiteUrl}
                            />
                            {this.state.website_url && <ValidationError message={this.validateWebsiteUrl()}/>} 
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='date applied'
                                name='date-applied' 
                                defaultValue={appDetails ? appDetails.date_applied : null} 
                                placeholder='Date Applied'
                                onChange={this.addDateApplied}
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='contact name'
                                name='contact' 
                                defaultValue={appDetails ? appDetails.contact_name : null} 
                                placeholder='Contact Name'
                                onChange={this.addContactName}
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='contact email'
                                name='contact_email' 
                                defaultValue={appDetails ? appDetails.contact_email : null} 
                                placeholder='Contact Email'
                                onChange={this.addContactName}
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='contact phone'
                                name='contact_phone' 
                                defaultValue={appDetails ? appDetails.contact_phone : null} 
                                placeholder='Contact Phone'
                                onChange={this.addContactPhone}
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='interview date'
                                name='interview_date' 
                                defaultValue={appDetails ? appDetails.interview_date : null} 
                                placeholder='Interview Date'
                                onChange={this.addInterviewDate}
                            />
                        </section>
                        <section className='appform_input'>
                            <label htmlFor='status'>Status: </label>
                            <select required onChange={this.addStatus}>
                                <option name='status' value=''>Choose here</option>
                                <option name='status' value='Interested'>Interested</option>
                                <option name='status' value='Applied'>Applied</option>
                                <option name='status' value='Closed'>Closed</option>
                            </select>
                        </section>
                        <section className='appform_input appform_textarea'>
                            <textarea 
                                name='notes'
                                aria-label='additional notes'
                                defaultValue={appDetails ? appDetails.notes : null} 
                                placeholder='Additional Notes...'
                                onChange={this.addNotes}
                            />
                        </section>
                            <SquareButton type='submit'>
                                <FontAwesomeIcon icon={faSave}/>
                            </SquareButton>
                            {/* path={appDetails ? `/jobapp/${appDetails.id}` : '/jobapps'}
                            /> */}
                            <SquareButton
                                content={'X'}
                                path={appDetails ? `/jobapp/${appDetails.id}` : '/jobapps'}
                            />
                    </form>
                </ErrorBoundary>
            </div>
        )
    }
}

export default AppForm
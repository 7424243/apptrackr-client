import React, {Component} from 'react'
import ApptrackrContext from '../../ApptrackrContext'
import RecButton from '../RecButton/RecButton'
import './AppForm.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import TokenService from '../../services/token-service'
import {isWebUri} from 'valid-url'
import config from '../../config'
import ValidationError from '../ValidationError/ValidationError'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import PropTypes from 'prop-types'

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
        error: null,
    }

    static contextType = ApptrackrContext

    componentDidMount() {
        const {user_id} = this.context
        this.setState({user_id})
        const applicationId = this.props.match.params.id
        if(applicationId) {
            fetch(`${config.API_ENDPOINT}/applications/${applicationId}`, {
                method: 'GET',
                headers: {
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
                    console.log(data)
                    this.setState({
                        job_name: data.job_name,
                        company_name: data.company_name,
                        website_url: data.website_url,
                        date_applied: data.date_applied ? new Date(Date.parse(data.date_applied)) : '',
                        contact_name: data.contact_name,
                        contact_email: data.contact_email,
                        contact_phone: data.contact_phone,
                        interview_date: data.interview_date ? new Date(Date.parse(data.interview_date)) : '',
                        status: data.status,
                        notes: data.notes,
                    })
                })
                .catch(error => {
                    this.setState({error})
                    console.log(error)
                })    
        }
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
        e.preventDefault()
        let payload = Object.assign({}, this.state)
        let id = parseInt(this.props.match.params.id)
        fetch(`${config.API_ENDPOINT}/applications/${id}`, {
            method: 'PATCH',
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
                this.context.updateApplication(data)
                this.props.history.push(`/jobapps/${id}`)
            })
            .catch(error => {
                this.setState({error})
                console.error({error})
            })
    }

    handleJobName = e => {
        this.setState({job_name: e.target.value})
    }

    handleCompanyName = e => {
        this.setState({company_name: e.target.value})
    }

    handleWebsiteUrl = e => {
        this.setState({website_url: e.target.value})
    }

    handleDateApplied = e => {
        this.setState({date_applied: e})
    }

    handleContactName = e => {
        this.setState({contact_name: e.target.value})
    }

    handleContactPhone = e => {
        this.setState({contact_phone: e.target.value})
    }

    handleContactEmail = e => {
        this.setState({contact_email: e.target.value})
    }

    handleInterviewDate = e => {
        this.setState({interview_date: e})
    }

    handleStatus = e => {
        this.setState({status: e.target.value})
    }

    handleNotes = e => {
        this.setState({notes: e.target.value})
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

    validateContactName() {
        const contactName = this.state.contact_name.trim()
        if(contactName.length === 0) {
            return 'A contact name must be 1 or more characters'
        }
    }

    validateContactEmail() {
        const contactEmail = this.state.contact_email.trim()
        if(contactEmail.length === 0) {
            return 'A contact email must be a valid email address'
        }
    }

    validateContactPhone() {
        const contactPhone = this.state.contact_phone.trim()
        if(contactPhone.length === 0) {
            return 'A contact phone must be a valid phone number'
        }
    }

    validateStatus() {
        const status = this.state.status.trim()
        if(status !== 'Interested' || status !== 'Applied' || status !== 'Closed') {
            return 'A status is required'
        }
    }

    validateNotes() {
        const notes = this.state.notes.trim()
        if(notes.length === 0) {
            return 'Notes must be 1 or more characters long'
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
                        <div className='appform_left'>
                            <p>* Required</p>
                            <section className='appform_section'>* 
                                <input 
                                    className='appform_input'
                                    type='text'
                                    aria-label='job title'
                                    name='job' 
                                    defaultValue={appDetails ? appDetails.job_name : null} 
                                    placeholder='Job Title'
                                    required
                                    onChange={this.handleJobName}
                                />
                                {this.state.job_name && <ValidationError message={this.validateJobName()}/>}
                            </section>
                            <section className='appform_section'>*   
                                <input 
                                    className='appform_input'
                                    type='text'
                                    aria-label='company name'
                                    name='company' 
                                    defaultValue={appDetails ? appDetails.company_name : null} 
                                    placeholder='Company Name'
                                    required
                                    onChange={this.handleCompanyName}
                                />
                                {this.state.company_name && <ValidationError message={this.validateCompanyName()}/>}
                            </section>
                            <section className='appform_section'>
                                <input 
                                    className='appform_input'
                                    type='url'
                                    aria-label='website url'
                                    name='website' 
                                    defaultValue={appDetails ? appDetails.website : null} 
                                    placeholder='Website'
                                    onChange={this.handleWebsiteUrl}
                                />
                                {this.state.website_url && <ValidationError message={this.validateWebsiteUrl()}/>} 
                            </section>
                            <section className='appform_section'>
                                <label htmlFor='date applied' className='appform_date'>Date Applied</label>
                                <DatePicker
                                    className='appform_input'
                                    placeholderText='Select Date Applied'
                                    dateFormat='MM/dd/yyyy'
                                    name='date_applied'
                                    selected={this.state.date_applied}
                                    onChange={this.handleDateApplied}
                                />
                            </section>
                            <section className='appform_section'>
                                <input 
                                    className='appform_input'
                                    type='text'
                                    aria-label='contact name'
                                    name='contact' 
                                    defaultValue={appDetails ? appDetails.contact_name : null} 
                                    placeholder='Contact Name'
                                    onChange={this.handleContactName}
                                />
                                {this.state.contact_name && <ValidationError message={this.validateContactName()}/>}
                            </section>
                            <section className='appform_section'>
                                <input 
                                    className='appform_input'
                                    type='text'
                                    aria-label='contact email'
                                    name='contact_email' 
                                    defaultValue={appDetails ? appDetails.contact_email : null} 
                                    placeholder='Contact Email'
                                    onChange={this.handleContactName}
                                />
                                {this.state.contact_email && <ValidationError message={this.validateContactEmail()}/>}
                            </section>
                            <section className='appform_section'>
                                <input 
                                    className='appform_input'
                                    type='text'
                                    aria-label='contact phone'
                                    name='contact_phone' 
                                    defaultValue={appDetails ? appDetails.contact_phone : null} 
                                    placeholder='Contact Phone'
                                    onChange={this.handleContactPhone}
                                />
                                {this.state.contact_phone && <ValidationError message={this.validateContactPhone()}/>}
                            </section>
                            <section className='appform_section'>
                                <DatePicker
                                    className='appform_input'
                                    placeholderText='Select Interview Date'
                                    dateFormat='MM/dd/yyyy'
                                    selected={this.state.interview_date}
                                    onChange={this.handleInterviewDate}
                                />
                            </section>
                        </div>
                        <div className='appform_right'>
                            <section className='appform_section'>
                                <label htmlFor='status'>* Status: </label>
                                <select id='status' className='appform_input' required defaultValue={appDetails ? appDetails.status : null} onChange={this.handleStatus}>
                                    <option aria-label='choose option' name='status' value=''>Choose here</option>
                                    <option aria-label='interested' name='status' value='Interested'>Interested</option>
                                    <option aria-label='applied' name='status' value='Applied'>Applied</option>
                                    <option aria-label='closed' name='status' value='Closed'>Closed</option>
                                </select>
                            </section>
                            <section className='appform_section appform_textarea'>
                                <textarea 
                                    className='appform_textarea'
                                    name='notes'
                                    aria-label='additional notes'
                                    defaultValue={appDetails ? appDetails.notes : null} 
                                    placeholder='Additional Notes...'
                                    onChange={this.handleNotes}
                                />
                                {this.state.notes && <ValidationError message={this.validateNotes()}/>}
                            </section>
                            <RecButton type='submit'>Save</RecButton>
                        </div>
                        
                    </form>
                </ErrorBoundary>
            </div>
        )
    }
}

export default AppForm

AppForm.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
}
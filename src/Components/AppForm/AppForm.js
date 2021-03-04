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
                    this.setState({
                        job_name: data.job_name,
                        company_name: data.company_name,
                        website_url: data.website_url,
                        date_applied: data.date_applied,
                        contact_name: data.contact_name,
                        contact_email: data.contact_email,
                        contact_phone: data.contact_phone,
                        interview_date: data.interview_date,
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

    handleSubmitEdit = e => {e.preventDefault()
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
                return res
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
        this.setState({date_applied: e.target.value})
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
        this.setState({interview_date: e.target.value})
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

    validateDateApplied() {
        const dateApplied = this.state.date_applied.trim()
        if(dateApplied.length < 10) {
            return 'mm/dd/yyyy'
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
        if(contactPhone.length < 13) {
            return '(xxx)xxx-xxxx'
        }
    }

    validateInterviewDate() {
        const interviewDate = this.state.interview_date.trim()
        if(interviewDate < 10) {
            return 'mm/dd/yyy'
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
                        <p>* Required</p>
                        <section className='appform_input'>* 
                            <input 
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
                        <section className='appform_input'>*   
                            <input 
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
                        <section className='appform_input'>
                            <input 
                                type='url'
                                aria-label='website url'
                                name='website' 
                                defaultValue={appDetails ? appDetails.website : null} 
                                placeholder='Website'
                                onChange={this.handleWebsiteUrl}
                            />
                            {this.state.website_url && <ValidationError message={this.validateWebsiteUrl()}/>} 
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='date applied ='
                                name='date-applied' 
                                defaultValue={appDetails ? appDetails.date_applied : null} 
                                placeholder='Date Applied mm/dd/yyyy'
                                onChange={this.handleDateApplied}
                            />
                            {this.state.date_applied && <ValidationError message={this.validateDateApplied()}/>}
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='contact name'
                                name='contact' 
                                defaultValue={appDetails ? appDetails.contact_name : null} 
                                placeholder='Contact Name'
                                onChange={this.handleContactName}
                            />
                            {this.state.contact_name && <ValidationError message={this.validateContactName()}/>}
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='contact email'
                                name='contact_email' 
                                defaultValue={appDetails ? appDetails.contact_email : null} 
                                placeholder='Contact Email'
                                onChange={this.handleContactName}
                            />
                            {this.state.contact_email && <ValidationError message={this.validateContactEmail()}/>}
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='contact phone'
                                name='contact_phone' 
                                defaultValue={appDetails ? appDetails.contact_phone : null} 
                                placeholder='Contact Phone (xxx)xxx-xxxx'
                                onChange={this.handleContactPhone}
                            />
                            {this.state.contact_phone && <ValidationError message={this.validateContactPhone()}/>}
                        </section>
                        <section className='appform_input'>
                            <input 
                                type='text'
                                aria-label='interview date'
                                name='interview_date' 
                                defaultValue={appDetails ? appDetails.interview_date : null} 
                                placeholder='Interview Date mm/dd/yyyy'
                                onChange={this.handleInterviewDate}
                            />
                            {this.state.interview_date && <ValidationError message={this.validateInterviewDate()}/>}
                        </section>
                        <section className='appform_input'>
                            <label htmlFor='status'>* Status: </label>
                            <select required defaultValue={appDetails ? appDetails.status : null} onChange={this.handleStatus}>
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
                                onChange={this.handleNotes}
                            />
                            {this.state.notes && <ValidationError message={this.validateNotes()}/>}
                        </section>
                            <SquareButton type='submit'>
                                <FontAwesomeIcon icon={faSave}/>
                            </SquareButton>
                            
                    </form>
                </ErrorBoundary>
            </div>
        )
    }
}

export default AppForm
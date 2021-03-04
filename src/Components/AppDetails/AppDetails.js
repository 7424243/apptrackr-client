import React, {Component} from 'react'
import SquareButton from '../SquareButton/SquareButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './AppDetails.css'
import ApptrackrContext from '../../ApptrackrContext'
import { NavLink } from 'react-router-dom'
import config from '../../config'
import TokenService from '../../services/token-service'

class AppDetails extends Component {

    state = {
        error: null
    }

    static contextType = ApptrackrContext

    handleClickDelete = e => {
        e.preventDefault()
        if(window.confirm('Are you sure you want to delete?')) {
            const id = parseInt(this.props.match.params.id)
            console.log(id)
            fetch(`${config.API_ENDPOINT}/applications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `bearer ${TokenService.getAuthToken()}`
                }
            })
                .then(res => {
                    if(!res.ok) {
                        return res.json().then(e => Promise.reject(e))
                    }
                    return res
                })
                .then(() => {
                    this.context.deleteApplication(id)
                    this.props.history.push('/jobapps')
                })
                .catch(error => {
                    this.setState({error})
                    console.error({error})
                })
        }
        
    }

    render() {
        const applicationId = parseInt(this.props.match.params.id)
        const {applications} = this.context
        const getApplication = (applications, applicationId) => 
            applications.find(application => application.id === applicationId)
        const applicationDetails = getApplication(applications, applicationId)
        return (
            <div className='appdetails_container'>
                <h2 className='appdetails_header'>{applicationDetails ? applicationDetails.job_name : null}</h2>
                <p className='appdetails'><strong>Company:</strong> {applicationDetails ? applicationDetails.company_name : null}</p>
                <p className='appdetails'><strong>Website:</strong> {applicationDetails && applicationDetails.website_url ? <a href={applicationDetails.website_url} target='_blank' rel='noreferrer'>Click Here</a> : null}</p>
                <p className='appdetails'><strong>Date Applied:</strong> {applicationDetails ? applicationDetails.date_applied : null}</p>
                <p className='appdetails'><strong>Contact:</strong> {applicationDetails ? applicationDetails.contact_name : null}</p>
                <p className='appdetails'><strong>Contact Email:</strong> {applicationDetails ? applicationDetails.contact_email : null}</p>
                <p className='appdetails'><strong>Contact Phone:</strong> {applicationDetails ? applicationDetails.contact_phone : null}</p>
                <p className='appdetails'><strong>Interview Date:</strong> {applicationDetails ? applicationDetails.interview_date : null}</p>
                <p className='appdetails'><strong>Status:</strong> {applicationDetails ? applicationDetails.status : null}</p>
                <p className='appdetails'><strong>Additional Notes:</strong> {applicationDetails ? applicationDetails.notes : null}</p>
                <div className='appdetails_buttons'>
                <NavLink to={'/jobapps'}><SquareButton><FontAwesomeIcon icon={faBackward}/></SquareButton></NavLink>
                <NavLink to={`/edit/${applicationId}`}><SquareButton><FontAwesomeIcon icon={faEdit}/></SquareButton></NavLink>
                <NavLink to={'/jobapps'}><SquareButton type='button' onClick={this.handleClickDelete}><FontAwesomeIcon icon={faTrashAlt}/></SquareButton></NavLink>
                </div>
            </div>
        )
    }
}

export default AppDetails
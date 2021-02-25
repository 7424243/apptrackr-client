import React, {Component} from 'react'
import SquareButton from '../SquareButton/SquareButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './AppDetails.css'
import ApptrackrContext from '../../ApptrackrContext'

class AppDetails extends Component {
    static contextType = ApptrackrContext
    render() {
        const appId = parseInt(this.props.match.params.id)
        const {apps} = this.context
        const getApp = (apps, appId) => 
            apps.find(app => app.id === appId)
        const appDetails = getApp(apps, appId)
        return (
            <div className='appdetails_container'>
                <h2 className='appdetails_header'>{appDetails ? appDetails.job_name : null}</h2>
                <p className='appdetails'><strong>Company:</strong> {appDetails ? appDetails.company_name : null}</p>
                <p className='appdetails'><strong>Website:</strong> <a href={appDetails ? appDetails.website : null} target='_blank' rel='noreferrer'>Click Here</a></p>
                <p className='appdetails'><strong>Date Applied:</strong> {appDetails ? appDetails.date_applied : null}</p>
                <p className='appdetails'><strong>Contact:</strong> {appDetails ? appDetails.contact_name : null}</p>
                <p className='appdetails'><strong>Contact Email:</strong> {appDetails ? appDetails.contact_email : null}</p>
                <p className='appdetails'><strong>Contact Phone:</strong> {appDetails ? appDetails.contact_phone : null}</p>
                <p className='appdetails'><strong>Interview Date:</strong> {appDetails ? appDetails.interview_date : null}</p>
                <p className='appdetails'><strong>Status:</strong> {appDetails ? appDetails.status : null}</p>
                <p className='appdetails'><strong>Additional Notes:</strong> {appDetails ? appDetails.notes : null}</p>
                <div className='appdetails_buttons'>
                    <SquareButton
                        path={'/jobapps'}
                        content={<FontAwesomeIcon icon={faBackward}/>}
                    />
                    <SquareButton
                        path={`/edit/${appId}`}
                        content={<FontAwesomeIcon icon={faEdit}/>}
                    />
                    <SquareButton
                        path={'/jobapps'}
                        content={<FontAwesomeIcon icon={faTrashAlt}/>}
                    />
                </div>
            </div>
        )
    }
}

export default AppDetails
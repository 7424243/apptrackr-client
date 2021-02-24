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
            <section>
                <div>
                    <h3>{appDetails ? appDetails.job_name : null}</h3>
                    <p>Company: {appDetails ? appDetails.company_name : null}</p>
                    <p>Website: <a href={appDetails ? appDetails.website : null} target='_blank' rel='noreferrer'>Click Here</a></p>
                    <p>Date Applied: {appDetails ? appDetails.date_applied : null}</p>
                    <p>Contact: {appDetails ? appDetails.contact_name : null}</p>
                    <p>Contact Email: {appDetails ? appDetails.contact_email : null}</p>
                    <p>Contact Phone: {appDetails ? appDetails.contact_phone : null}</p>
                    <p>Interview Date: {appDetails ? appDetails.interview_date : null}</p>
                    <p>Status: {appDetails ? appDetails.status : null}</p>
                    <p>Additional Notes: {appDetails ? appDetails.notes : null}</p>
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
            </section>
        )
    }
}

export default AppDetails
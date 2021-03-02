import React, {Component} from 'react'
import ApptrackrContext from '../../ApptrackrContext'
import TableItem from '../TableItem/TableItem'
import config from '../../config'
import TokenService from '../../services/token-service'
import './Table.css'

class Table extends Component {

    state = {
        applications: [],
        error: null
    }

    static contextType = ApptrackrContext

    componentDidMount() {
        const user_id = TokenService.getUserIdFromToken()
        fetch(`${config.API_ENDPOINT}/applications/user/${user_id}`, {
            method: 'GET',
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
            .then(applications => {
                this.setState({applications})
                this.context.getUserApplications(applications)
            })
            .catch(error => {
                this.setState({error})
                console.error({error})
            })
    }
    
    render() {
        const {applications} = this.state
        const applicationItems = applications.map(application => {
            return (
                <TableItem
                    key={application.id}
                    id={application.id}
                    job={application.job_name}
                    company={application.company_name}
                    dateApplied={application.date_applied ? application.date_applied : null}
                    interviewDate={application.interview_date ? application.interview_date : null}
                    status={application.status}
                />
            )
        })
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Job</th>
                        <th>Company</th>
                        <th>Date Applied</th>
                        <th>Interview Date</th>
                        <th className='last_th'>Status</th>
                    </tr>
                    {applicationItems}
                </tbody>
            </table>
        )
    }
}

export default Table
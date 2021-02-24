import React, {Component} from 'react'
import ApptrackrContext from '../../ApptrackrContext'
import SquareButton from '../SquareButton/SquareButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import './AppForm.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

class AppForm extends Component {
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
                    <h3>New Job Application</h3>
                    <ErrorBoundary>
                        <form>
                            <section>
                                <input 
                                    name='job' 
                                    defaultValue={appDetails ? appDetails.job_name : null} 
                                    placeholder='Job Title'
                                />
                            </section>
                            <section>
                                <input 
                                    name='company' 
                                    defaultValue={appDetails ? appDetails.company_name : null} 
                                    placeholder='Company Name'
                                />
                            </section>
                            <section>
                                <input 
                                    name='website' 
                                    defaultValue={appDetails ? appDetails.website : null} 
                                    placeholder='Website'
                                />
                            </section>
                            <section>
                                <input 
                                    name='date-applied' 
                                    defaultValue={appDetails ? appDetails.date_applied : null} 
                                    placeholder='Date Applied'
                                />
                            </section>
                            <section>
                                <input 
                                    name='contact' 
                                    defaultValue={appDetails ? appDetails.contact_name : null} 
                                    placeholder='Contact Name'
                                />
                            </section>
                            <section>
                                <input 
                                    name='contact_email' 
                                    defaultValue={appDetails ? appDetails.contact_email : null} 
                                    placeholder='Contact Email'
                                />
                            </section>
                            <section>
                                <input 
                                    name='contact_phone' 
                                    defaultValue={appDetails ? appDetails.contact_phone : null} 
                                    placeholder='Contact Phone'
                                />
                            </section>
                            <section>
                                <input 
                                    name='interview_date' 
                                    defaultValue={appDetails ? appDetails.interview_date : null} 
                                    placeholder='Interview Date'
                                />
                            </section>
                            <section>
                                <label htmlFor='status'>Status: </label>
                                <select>
                                    <option value='' disabled>Choose here</option>
                                    <option value='Interested'>Interested</option>
                                    <option value='Active'>Active</option>
                                    <option value='Closed'>Closed</option>
                                </select>
                            </section>
                            <section>
                                <textarea 
                                    defaultValue={appDetails ? appDetails.notes : null} 
                                    placeholder='Additional Notes...'
                                />
                            </section>
                        </form>
                    </ErrorBoundary>
                    <SquareButton
                        content={<FontAwesomeIcon icon={faSave}/>}
                        path={'/jobapps'}
                    />
                </div>
            </section>
        )
    }
}

export default AppForm
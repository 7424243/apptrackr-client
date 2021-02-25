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
            <div className='appform_container'>
                <h2 className='appform_header'>{appDetails ? 'Edit Job Application' : 'New Job Application'}</h2>
                <ErrorBoundary>
                    <form className='appform_form'>
                        <section className='appform_input'>
                            <input 
                                name='job' 
                                defaultValue={appDetails ? appDetails.job_name : null} 
                                placeholder='Job Title'
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                name='company' 
                                defaultValue={appDetails ? appDetails.company_name : null} 
                                placeholder='Company Name'
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                name='website' 
                                defaultValue={appDetails ? appDetails.website : null} 
                                placeholder='Website'
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                name='date-applied' 
                                defaultValue={appDetails ? appDetails.date_applied : null} 
                                placeholder='Date Applied'
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                name='contact' 
                                defaultValue={appDetails ? appDetails.contact_name : null} 
                                placeholder='Contact Name'
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                name='contact_email' 
                                defaultValue={appDetails ? appDetails.contact_email : null} 
                                placeholder='Contact Email'
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                name='contact_phone' 
                                defaultValue={appDetails ? appDetails.contact_phone : null} 
                                placeholder='Contact Phone'
                            />
                        </section>
                        <section className='appform_input'>
                            <input 
                                name='interview_date' 
                                defaultValue={appDetails ? appDetails.interview_date : null} 
                                placeholder='Interview Date'
                            />
                        </section>
                        <section className='appform_input'>
                            <label htmlFor='status'>Status: </label>
                            <select>
                                <option value='' disabled>Choose here</option>
                                <option value='Interested'>Interested</option>
                                <option value='Applied'>Applied</option>
                                <option value='Closed'>Closed</option>
                            </select>
                        </section>
                        <section className='appform_input appform_textarea'>
                            <textarea 
                                defaultValue={appDetails ? appDetails.notes : null} 
                                placeholder='Additional Notes...'
                            />
                        </section>
                            <SquareButton
                            content={<FontAwesomeIcon icon={faSave}/>}
                            path={appDetails ? `/jobapp/${appDetails.id}` : '/jobapps'}
                            />
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
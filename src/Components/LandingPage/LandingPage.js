import React from 'react'
import {NavLink} from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
    return (
        <>
            <section className='landing_section1'>
            <div className='landing_section1_content'>
                <div className='landing'>
                    <h2>Easily organize job applications</h2>
                    <p>Keep track of details for each job application</p>
                    <p>Save frequently utilized resources for convenient access</p>
                    <p><NavLink to={'/login'}>Login</NavLink> with a demo account to take a peak</p>
                    <p>Username: demo</p>
                    <p>Password: Demo1234!</p>
                </div>
            </div>
            </section>
            <div className='landing_table'>
                <table>
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Company</th>
                            <th>Date Applied</th>
                            <th>Interview Date</th>
                            <th className='last_th'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{'Full Stack Software Engineer'}</td>
                            <td>{'Olive'}</td>
                            <td></td>
                            <td></td>
                            <td className='last_td'>{'Interested'}</td>
                        </tr>
                        <tr>
                            <td>{'EDU Software Engineer'}</td>
                            <td>{'Splunk'}</td>
                            <td>{'02/03/2021'}</td>
                            <td>{'02/10/2021'}</td>
                            <td className='last_td'>{'Applied'}</td>
                        </tr>
                        <tr>
                            <td>{'Software Engineer'}</td>
                            <td>{'Google'}</td>
                            <td>{'02/15/2021'}</td>
                            <td>{'03/01/2021'}</td>
                            <td className='last_td'>{'Applied'}</td>
                        </tr>
                        <tr>
                            <td>{'Web Developer'}</td>
                            <td>{'Toddy LLC'}</td>
                            <td>{'02/15/2021'}</td>
                            <td>{'02/26/2021'}</td>
                            <td className='last_td'>{'Closed'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </>
    )
}

export default LandingPage
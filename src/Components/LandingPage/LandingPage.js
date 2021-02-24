import React from 'react'
import './LandingPage.css'

function LandingPage() {
    return (
        <div>
            <section className='landing_section1'>
            <div className='landing_section1_content'>
                <div className='landing'>
                    <ul className='landing_list'>
                        <li>Easily keep track of job applications!</li>
                        <li>Quickly access notes regarding specific applications!</li>
                        <li>Save frequented job boards for convenient access!</li>
                        <li>Streamline the job search process!</li>
                    </ul>
                </div>
                <img className='landing-img' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAADCCAMAAACYEEwlAAAAA1BMVEXb29tVa/CDAAAASElEQVR4nO3BMQEAAADCoPVPbQhfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeA8XKAAFZcBBuAAAAAElFTkSuQmCC' alt='img of an example table'/>
            </div>
            </section>
            <section className='landing_section2'>
                <div className='landing_section2_content'>
                    <img className='landing-img' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARYAAAC1CAMAAACtbCCJAAAACVBMVEVjY2NeXl65ubnV9x57AAAATUlEQVR4nO3BMQEAAAgDoGn/0BZYAA8gAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4J+hyFIcuuEDQ5L8dNwAAAAASUVORK5CYII=' alt='img of resources page'/>
                    <p>Sign in with these credentials to take a peak!</p>
                    <p>Username: username</p>
                    <p>Password: password</p>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
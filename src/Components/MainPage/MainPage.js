import React, {Component} from 'react'
import SquareButton from '../SquareButton/SquareButton'
import Table from '../Table/Table'
import './MainPage.css'

class MainPage extends Component {
    render() {
        return (
            <div className='main_container'>
                <section className='section1'>
                    <div className='section1_content'>
                        <p>"If one advances confidently in the direction of his dreams,
                            and endeavors to live the life which he has imagined,
                            he will meet with a success unexpected in common hours." ~ Henry David Thoreau 
                        </p>
                    </div>
                </section>
                <section className='section2'>
                    <h2 className='main_header'>Job Applications</h2>
                    <div className='section2_content'>
                        <SquareButton 
                            content={'+'}
                            path={'/newapp'}
                        />
                        <div>
                            <label>Filter By: </label>
                            <select>
                                <option>All</option>
                                <option>Interested</option>
                                <option>Applied</option>
                                <option>Closed</option>
                            </select>
                        </div>
                    </div>
                </section>
                <section className='section3'>
                    <Table />
                </section>
            </div>
        )
    }
}

export default MainPage
import React, {Component} from 'react'
import SquareButton from '../SquareButton/SquareButton'
import Table from '../Table/Table'
import './MainPage.css'

class MainPage extends Component {
    render() {
        return (
            <>
                <section className='section1'>
                    <div className='section1_content'>
                        <p>"If one advances confidently in the direction of his dreams,
                            and endeavors to live the life which he has imagined,
                            he will meet with a success unexpected in common hours." ~ Henry David Thoreau 
                        </p>
                    </div>
                </section>
                <section className='section2'>
                    <div className='section2_content'>
                        <SquareButton 
                            content={'+'}
                            path={'/newapp'}
                        />
                        <label>Filter By: </label>
                        <select>
                            <option>Interested</option>
                            <option>Active</option>
                            <option>Closed</option>
                        </select>
                    </div>
                </section>
                <section className='section3'>
                    <Table />
                </section>
            </>
        )
    }
}

export default MainPage
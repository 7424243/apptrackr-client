import React, {Component} from 'react'
import SquareButton from '../SquareButton/SquareButton'
import {Link} from 'react-router-dom'
import Table from '../Table/Table'
import './MainPage.css'
import TokenService from '../../services/token-service'
import ApptrackrContext from '../../ApptrackrContext'

class MainPage extends Component {

    state = {
        filter: 'All'
    }

    static contextType = ApptrackrContext

    componentDidMount() {
        const user_id = TokenService.getUserIdFromToken()
        //this.setState({user_id: user_id})
        this.context.addUserId(user_id)
    }

    addFilter = e => {
        this.setState({filter: e.target.value})
    }

    render() {
        return (
            <>
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
                            <Link to='/newapp'>
                                <SquareButton>+</SquareButton> 
                            </Link>
                                <div>
                                    <label>Filter By: </label>
                                    <select onChange={this.addFilter}>
                                        <option>All</option>
                                        <option>Interested</option>
                                        <option>Applied</option>
                                        <option>Closed</option>
                                    </select>
                                </div>

                        </div>
                    </section>
    
                </div>
                <section className='section3'>
                    <Table filter={this.state.filter}/>  
                </section>
            </>
        )
    }

    
}

export default MainPage
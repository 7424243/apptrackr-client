import React, {Component} from 'react'
import ResourceItem from '../ResourceItem/ResourceItem'
import SquareButton from '../SquareButton/SquareButton'
import './ResourcesList.css'
import ApptrackrContext from '../../ApptrackrContext'
import TokenService from '../../services/token-service'
import config from '../../config'
import {NavLink} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import PropTypes from 'prop-types' 
import RecButton from '../RecButton/RecButton'

class ResourcesList extends Component {

    state = {
        resources: [],
        error: null
    }

    static contextType = ApptrackrContext

    componentDidMount() {
        const {user_id} = this.context
        fetch(`${config.API_ENDPOINT}/resources/user/${user_id}`, {
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
            .then(resources => {
                this.setState({resources})
                this.context.getUserResources(resources)
            })
            .catch(error => {
                this.setState({error})
                console.error({error})
            })
    }

    handleClickDelete(id) {
        //confirm to delete
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`${config.API_ENDPOINT}/resources/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `bearer ${TokenService.getAuthToken()}`
                            }
                        })
                            .then(res => {
                                if(!res.ok) {
                                    return res.json().then(e => Promise.reject(e))
                                }
                                return res
                            })
                            .then(() => {
                                this.context.deleteResource(id)
                            })
                            .catch(error => {
                                this.setState({error})
                                console.error({error})
                            })
                    }         
                },
                {
                    label: 'No',
                    onClick: () => this.props.history.push('/resources')
                }
            ]
        })
    }

    render() {
        const {resources} = this.context
        const sortFunction = (a, b) => {
            if(a.resource_name.toLowerCase() < b.resource_name.toLowerCase()) {
                return -1
            }
            if(a.resource_name.toLowerCase() > b.resource_name.toLowerCase()) {
                return 1
            }
            return 0
        }
        const alphabetizedResources = resources.sort(sortFunction)
        const otherResources = alphabetizedResources.filter(resource => resource.type === 'Other Resource')
        const jobResources = alphabetizedResources.filter(resource => resource.type === 'Job Resource')
        const jobResourceItems = jobResources.map(resource => {
            return (
                <div className='resource_item' key={resource.id}>
                    <ResourceItem 
                        id={resource.id}
                        name={resource.resource_name}
                        url={resource.resource_url}
                    />
                    <div className='resource_delete'>
                        <RecButton type='button' onClick={() => this.handleClickDelete(resource.id)}>Delete</RecButton>
                    </div>
                </div>
            )
        })
        const otherResourceItems = otherResources.map(resource => {
            return (
                <div className='resource_item' key={resource.id}>
                    <ResourceItem 
                        id={resource.id}
                        name={resource.resource_name}
                        url={resource.resource_url}
                    />
                    <RecButton type='button' onClick={() => this.handleClickDelete(resource.id)}>Delete</RecButton>
                </div>
            )
        })
        return (
            <div>
                <section className='resources_section1'>
                    <div className='resources_section1_content'>
                        <h2>Job Postings</h2>
                        <ul>
                            {jobResourceItems}
                        </ul>
                        {resources.length === 0? <p>Add a resource to get started!</p> : null}
                        <NavLink to='/newresource' className='resource_add_button'><SquareButton >+</SquareButton></NavLink>
                    </div>
                </section>
                <hr/>
                <section className='resources_section2'>
                    <div className='resources_section2_content'>
                        <h2>Resume & Other Resources</h2>
                        <ul>
                            {otherResourceItems}
                        </ul>
                        {resources.length === 0? <p>Add a resource to get started!</p> : null}
                        <NavLink to='/newresource'  className='resource_add_button'><SquareButton>+</SquareButton></NavLink>
                    </div>
                </section>
            </div>
        )
    }
}

export default ResourcesList

ResourcesList.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
}
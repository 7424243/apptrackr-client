import React, {Component} from 'react'
import ResourceItem from '../ResourceItem/ResourceItem'
import SquareButton from '../SquareButton/SquareButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './ResourcesList.css'
import ApptrackrContext from '../../ApptrackrContext'
import TokenService from '../../services/token-service'
import config from '../../config'
import {NavLink} from 'react-router-dom'

class ResourcesList extends Component {

    state = {
        resources: [],
        deleteSuccess: null,
        error: null
    }

    static contextType = ApptrackrContext

    componentDidMount() {
        const user_id = TokenService.getUserIdFromToken()
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
                this.setState({deleteSuccess: true})
            })
            .catch(error => {
                this.setState({error})
                console.error({error})
            })
    }

    render() {
        const {resources} = this.state
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
                <div className='resource_item'>
                    <ResourceItem 
                        key={resource.id}
                        id={resource.id}
                        name={resource.resource_name}
                        url={resource.resource_url}
                    />
                    <SquareButton type='button' onClick={() => this.handleClickDelete(resource.id)}><FontAwesomeIcon icon={faTrashAlt}/></SquareButton>
                </div>

            )
        })
        const otherResourceItems = otherResources.map(resource => {
            return (
                <div className='resource_item'>
                    <ResourceItem 
                        key={resource.id}
                        id={resource.id}
                        name={resource.resource_name}
                        url={resource.resource_url}
                    />
                    <SquareButton type='button' onClick={() => this.handleClickDelete(resource.id)}><FontAwesomeIcon icon={faTrashAlt}/></SquareButton>
                </div>

            )
        })
        return (
            <div>
                <section className='resources_section1'>
                    <div className='resources_section1_content'>
                        <h2>Job Boards</h2>
                        <ul>
                            {jobResourceItems}
                        </ul>
                        <NavLink to='/newresource'><SquareButton>+</SquareButton></NavLink>
                    </div>
                </section>
                <hr/>
                <section className='resources_section2'>
                    <div className='resources_section2_content'>
                        <h2>Resume & Other Resources</h2>
                        <ul>
                            {otherResourceItems}
                        </ul>
                        <NavLink to='/newresource'><SquareButton>+</SquareButton></NavLink>
                    </div>
                </section>
            </div>
        )
    }
}

export default ResourcesList
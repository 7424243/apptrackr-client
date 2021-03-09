import React from 'react'
import './ResourceItem.css'
import PropTypes from 'prop-types'

function ResourceItem(props) {
    return (
        <li className='resource_item_content' key={props.id}>
            <a 
                href={props.url} 
                target='_blank' 
                rel='noreferrer'
            >{props.name} ⇢
            </a>
        </li>
    )
}

export default ResourceItem

ResourceItem.propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

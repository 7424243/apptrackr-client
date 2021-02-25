import React from 'react'
import './ResourceItem.css'

function ResourceItem(props) {
    return (
        <li className='resource_item_content'>
            <a 
                href={props.url} 
                target='_blank' 
                rel='noreferrer'
            >{props.name}
            </a>
        </li>
    )
}

export default ResourceItem

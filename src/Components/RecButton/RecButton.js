import React from 'react'
import {Link} from 'react-router-dom'
import './RecButton.css'

function RecButton(props) {
    return (
        <Link 
            className='recbutton_content' 
            to={props.path}
        >
            <button className='recbutton'>{props.content}</button>
        </Link>
    )
}

export default RecButton

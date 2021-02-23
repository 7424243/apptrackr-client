import React from 'react'
import {Link} from 'react-router-dom'
import './RecButton.css'

function RecButton(props) {
    return (
        <Link to={props.path}><button>{props.content}</button></Link>
    )
}

export default RecButton

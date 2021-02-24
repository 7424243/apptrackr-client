import React from 'react'
import {Link} from 'react-router-dom'
import './SquareButton.css'

function SquareButton(props) {
    return (
        <div>
            <Link to={props.path}><button>{props.content}</button></Link>
        </div>
        
    )
}

export default SquareButton
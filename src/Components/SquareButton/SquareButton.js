import React from 'react'
import {Link} from 'react-router-dom'
import './SquareButton.css'

function SquareButton(props) {
    return (
        <div>
            <Link 
                className='squarebutton_content' 
                to={props.path}
            >
                <button className='squarebutton'>{props.content}</button>
            </Link>
        </div>
        
    )
}

export default SquareButton
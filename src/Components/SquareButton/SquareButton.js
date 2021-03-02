import React from 'react'
import './SquareButton.css'

function SquareButton(props) {
    return (
        <div className='squarebutton_content'>

            <button className='squarebutton' {...props}></button>

        </div>
    )
}

export default SquareButton
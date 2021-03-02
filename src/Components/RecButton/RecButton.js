import React from 'react'
import './RecButton.css'

function RecButton(props) {

     return (
         <div className='recbutton_content'>
            <button className='recbutton' {...props}></button>
         </div>
    )
}

export default RecButton

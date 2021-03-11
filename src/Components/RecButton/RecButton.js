import React from 'react'
import PropTypes from 'prop-types'
import './RecButton.css'

function RecButton(props) {
     return (
         <div className='recbutton_content'>
            <button className='recbutton' {...props}></button>
         </div>
    )
}

export default RecButton

RecButton.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func
}



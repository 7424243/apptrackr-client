import React from 'react'
import './RecButton.css'
import PropTypes from 'prop-types'

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
}



import React from 'react'
import PropTypes from 'prop-types'
import './SquareButton.css'

function SquareButton(props) {
    return (
        <div className='squarebutton_content'>
            <button className='squarebutton' {...props}></button>
        </div>
    )
}

export default SquareButton

SquareButton.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    
}
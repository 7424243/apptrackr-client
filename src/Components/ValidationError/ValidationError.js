import React from 'react'

function ValidationError(props) {
    
    //if props.message display it, otherwise, return nothing
    if(props.message) {
        return (
            <div className='error'>{props.message}</div>
        )
    }
    return <></>
}

export default ValidationError
import React from 'react'
import {Link} from 'react-router-dom'
import './TableItem.css'

function TableItem(props) {

    return (
        <div>
            <span><Link to={`/jobapp/${props.id}`}>{props.job}</Link></span>
            <span>{props.company}</span>
            <span>{props.dateApplied}</span>
            <span>{props.interviewDate}</span>
            <span>{props.status}</span>
        </div>
    )
}

export default TableItem
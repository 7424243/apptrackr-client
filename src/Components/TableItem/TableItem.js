import React from 'react'
import {NavLink} from 'react-router-dom'
import './TableItem.css'

function TableItem(props) {
    return (
        <div>
            <span><NavLink to={`/jobapps/${props.id}`}>{props.job}</NavLink></span>
            <span>{props.company}</span>
            <span>{props.dateApplied}</span>
            <span>{props.interviewDate}</span>
            <span>{props.status}</span>
        </div>
    )
}

export default TableItem
import React from 'react'
import {Link} from 'react-router-dom'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import './TableItem.css'

function TableItem(props) {
    return (
        <tbody>
            <tr>
                <td data-title='Job' className='job'><Link to={`/jobapps/${props.id}`}>{props.job}</Link></td>
                <td data-title='Company'>{props.company}</td>
                <td data-title='Date Applied'>{props.dateApplied ? format(new Date(props.dateApplied), 'MM/dd/yyy') : '--'}</td>
                <td data-title='Interview Date'>{props.interviewDate ? format(new Date(props.interviewDate), 'MM/dd/yyyy') : '--'}</td>
                <td data-title='Status' className='last_td'>{props.status}</td>
            </tr>
        </tbody>
    )
    
}

export default TableItem

TableItem.propTypes = {
    id: PropTypes.number.isRequired,
    job: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    dateApplied: PropTypes.string,
    interviewDate: PropTypes.string,
    status: PropTypes.string.isRequired
}


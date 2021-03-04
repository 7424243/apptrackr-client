import React from 'react'
import {Link} from 'react-router-dom'
import './TableItem.css'

function TableItem(props) {

    return (
        <tbody>
            <tr>
                <td><Link to={`/jobapps/${props.id}`}>{props.job}</Link></td>
                <td>{props.company}</td>
                <td>{props.dateApplied}</td>
                <td>{props.interviewDate}</td>
                <td className='last_td'>{props.status}</td>
            </tr>
        </tbody>
    )
}

export default TableItem
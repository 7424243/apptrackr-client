import React from 'react'
import {Link} from 'react-router-dom'
import { format } from 'date-fns';
import './TableItem.css'

function TableItem(props) {

    return (
        <tbody>
            <tr>
                <td><Link to={`/jobapps/${props.id}`}>{props.job}</Link></td>
                <td>{props.company}</td>
                <td>{props.dateApplied ? format(new Date(props.dateApplied), 'MM/dd/yyy') : null}</td>
                <td>{props.interviewDate ? format(new Date(props.interviewDate), 'MM/dd/yyyy') : null}</td>
                <td className='last_td'>{props.status}</td>
            </tr>
        </tbody>
    )
}

export default TableItem
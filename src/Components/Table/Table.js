import React, {Component} from 'react'
import TableItem from '../TableItem/TableItem'
import './Table.css'

class Table extends Component {
    render() {
        return (
            <table>
                <tr>
                    <th>Job</th>
                    <th>Company</th>
                    <th>Date Applied</th>
                    <th>Interview Date</th>
                    <th className='last_th'>Status</th>
                </tr>
                <TableItem 
                    id={1}
                    job={'React Front End Engineer'}
                    company={'Madwire'}
                    dateApplied={''}
                    interviewDate={''}
                    status={'Interested'}
                />
                <TableItem
                    id={3}
                    job={'Software Engineer Intern'}
                    company={'Hewlett Packard Enterprise'}
                    dateApplied={'2/1/21'}
                    interviewDate={'2/15/21'}
                    status={'Applied'}
                />
                <TableItem
                    id={4}
                    job={'EDU Software Engineer'}
                    company={'Splunk'}
                    dateApplied={'2/3/21'}
                    interviewDate={'2/10/21'}
                    status={'Applied'}
                />
                <TableItem
                    id={2}
                    job={'Software Engineer'}
                    company={'Colorado State University'}
                    dateApplied={'2/5/21'}
                    interviewDate={'2/16/21'}
                    status={'Closed'}
                />
            </table>
        )
    }
}

export default Table
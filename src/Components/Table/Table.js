import React, {Component} from 'react'
import TableItem from '../TableItem/TableItem'
import './Table.css'

class Table extends Component {
    render() {
        return (
            <div className="grid">
                <span>
                    <strong>Job</strong>
                </span>
                <span>
                    <strong>Company</strong>
                </span>
                <span>
                    <strong>Date Applied</strong>
                </span>
                <span>
                    <strong>Contact</strong>
                </span>
                <span>
                    <strong>Interview Date</strong>
                </span>
                <span>
                    <strong>Follow-Up</strong>
                </span>
                <span>
                    <strong>Status</strong>
                </span>
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
                    status={'Active'}
                />
                <TableItem
                    id={4}
                    job={'EDU Software Engineer'}
                    company={'Splunk'}
                    dateApplied={'2/3/21'}
                    interviewDate={'2/10/21'}
                    status={'Active'}
                />
                <TableItem
                    id={2}
                    job={'Software Engineer'}
                    company={'Colorado State University'}
                    dateApplied={'2/5/21'}
                    interviewDate={'2/16/21'}
                    status={'Closed'}
                />
            </div>
        )
    }
}

export default Table
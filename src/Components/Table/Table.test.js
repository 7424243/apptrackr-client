import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'
import Table from './Table'

describe('Table Component', () => {

    //smoke test
    it('renders without crashing', () => {
        Storage.prototype.getItem = jest.fn(() => 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MTE5NTYwMDMsInN1YiI6ImRlbW8ifQ.f9WIVijmP-pud7JsTd2ysx4eqtpm6JnzOkUeGRihdVE')
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter><Table/></BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        Storage.prototype.getItem = jest.fn(() => 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MTE5NTYwMDMsInN1YiI6ImRlbW8ifQ.f9WIVijmP-pud7JsTd2ysx4eqtpm6JnzOkUeGRihdVE')
        const tree = renderer
            .create(<BrowserRouter><Table/></BrowserRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
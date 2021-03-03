import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'
import Table from './Table'

describe('Table Component', () => {

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter><Table/></BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<BrowserRouter><Table/></BrowserRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
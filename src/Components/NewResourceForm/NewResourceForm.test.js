import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'
import NewResourceForm from './NewResourceForm'

describe('NewResourceForm Component', () => {

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter><NewResourceForm/></BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<BrowserRouter><NewResourceForm/></BrowserRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
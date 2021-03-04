import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import NewResourceForm from './NewResourceForm'

describe('NewResourceForm Component', () => {

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<NewResourceForm/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<NewResourceForm/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
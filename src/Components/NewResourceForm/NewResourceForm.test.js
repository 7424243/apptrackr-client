import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import NewResourceForm from './NewResourceForm'

describe('NewResourceForm Component', () => {

    const props = {
        history: {
            push: jest.fn()
        }
    }

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<NewResourceForm {...props}/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<NewResourceForm {...props}/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
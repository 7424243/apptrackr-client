import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ValidationError from './ValidationError'

describe('ValidationError Component', () => {

    const props = {
        message: 'test'
    }

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<ValidationError {...props}/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<ValidationError {...props}/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
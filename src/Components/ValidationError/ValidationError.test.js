import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ValidationError from './ValidationError'

describe('ValidationError Component', () => {

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<ValidationError />, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<ValidationError/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
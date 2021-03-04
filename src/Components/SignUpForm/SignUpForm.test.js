import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import SignUpForm from './SignUpForm'

describe('SignUpForm Component', () => {

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<SignUpForm/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<SignUpForm/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
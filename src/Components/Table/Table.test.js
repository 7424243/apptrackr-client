import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Table from './Table'

describe('Table Component', () => {

    const props = {
        filter: 'test'
    }

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Table {...props}/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<Table {...props}/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
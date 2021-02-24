import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ErrorBoundary from './ErrorBoundary'

describe('ErrorBoundary Component', () => {

    function Something() {
        return null
    }

    //smoke test
    it('renders without crashing if error', () => {
        const div = document.createElement('div')
        ReactDOM.render(<ErrorBoundary><Something/></ErrorBoundary>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<ErrorBoundary><Something/></ErrorBoundary>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

})
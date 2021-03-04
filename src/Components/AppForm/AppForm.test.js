import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import AppForm from './AppForm'

describe('AppForm Component', () => {
    
    const props = {
        match: {
            params: {
                id: '2'
            }
        }
    }

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<AppForm {...props}/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<AppForm {...props}/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
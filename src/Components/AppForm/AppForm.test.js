import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
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
        ReactDOM.render(<BrowserRouter><AppForm {...props}/></BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<BrowserRouter><AppForm {...props}/></BrowserRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
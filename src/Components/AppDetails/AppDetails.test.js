import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
import AppDetails from './AppDetails'

describe('AppDetails Component', () => {

    const props = {
        match: {
            params: {
                id: '2'
            }
        },
        history: {
            push: jest.fn()
        }
    }

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter><AppDetails {...props}/></BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<BrowserRouter><AppDetails {...props}/></BrowserRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

})
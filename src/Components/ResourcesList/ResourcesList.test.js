import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
import ResourcesList from './ResourcesList'

describe('ResourcesList Component', () => {

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter><ResourcesList/></BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<BrowserRouter><ResourcesList/></BrowserRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
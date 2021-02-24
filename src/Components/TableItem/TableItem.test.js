import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
import TableItem from './TableItem'

describe('TableItem Component', () => {

    const props = {
        id: 1,
        company: 'test',
        dateApplied: 'test',
        interviewDate: 'test',
        status: 'test'
    }

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter><TableItem {...props}/></BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<BrowserRouter><TableItem {...props}/></BrowserRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
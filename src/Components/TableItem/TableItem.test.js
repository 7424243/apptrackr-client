import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
import TableItem from './TableItem'

describe('TableItem Component', () => {

    const props = {
        id: 1,
        company: 'test',
        dateApplied: '2021-03-08T07:00:00.000Z',
        interviewDate: '2021-03-08T07:00:00.000Z',
        status: 'test'
    }

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter><table><TableItem {...props}/></table></BrowserRouter>, div)
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
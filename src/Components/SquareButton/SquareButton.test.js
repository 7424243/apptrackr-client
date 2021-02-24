import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
import SquareButton from './SquareButton'

describe('SquareButton Component', () => {

    const props = {
        path: '/',
        content: 'test'
    }

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter><SquareButton {...props}/></BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<BrowserRouter><SquareButton {...props}/></BrowserRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

})
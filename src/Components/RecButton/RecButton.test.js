import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import RecButton from './RecButton'

describe('RecButton Component', () => {

    const props = {
        path: '/', 
        content: 'test'
    }

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<RecButton {...props}/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<RecButton {...props}/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
import ReactDOM from 'react-dom'
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
        ReactDOM.render(<SquareButton {...props}/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<SquareButton {...props}/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

})
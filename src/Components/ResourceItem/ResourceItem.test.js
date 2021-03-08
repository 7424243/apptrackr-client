import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ResourceItem from './ResourceItem'

describe('ResourceItem Component', () => {

    const props = {
        url: 'https://www.google.com',
        name: 'test',
        id: 1
    }

    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<ResourceItem {...props}/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    //snapshot test
    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<ResourceItem {...props}/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
    
})
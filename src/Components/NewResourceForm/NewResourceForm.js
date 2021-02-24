import React, {Component} from 'react'
import SquareButton from '../SquareButton/SquareButton'
import './NewResourceForm.css'

class NewResourceForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <h2>New Resource</h2>
                    <section>
                        <input placeholder="Resource Name"/>
                    </section>
                    <section>
                        <input placeholder="Resource Link"/>
                    </section>
                </form>
                <SquareButton 
                    content={'+'}
                    path={'/resources'}
                />
            </div>
        )
    }
}

export default NewResourceForm
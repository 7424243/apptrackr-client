import React, {Component} from 'react'
import SquareButton from '../SquareButton/SquareButton'
import './NewResourceForm.css'

class NewResourceForm extends Component {
    render() {
        return (
            <div className='resourceform_container'>
                <h2 className='resourceform_header'>New Resource</h2>
                <form className='resourceform_form'>
                    <section className='resourceform_input'>
                        <input placeholder="Resource Name"/>
                    </section>
                    <section className='resourceform_input'>
                        <input placeholder="Resource Link"/>
                    </section>
                    <SquareButton 
                        content={'+'}
                        path={'/resources'}
                    />
                </form>
            </div>
        )
    }
}

export default NewResourceForm
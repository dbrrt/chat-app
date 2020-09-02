import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
export const NewMessageBox = () => {
    return (
        <div className='message-box'>
            <FontAwesomeIcon className='close-icon-btn' icon={faTimes}/>
            <div>
                <textarea rows={3} className='input-message-box' />
                <br />
                <br />
                <button className='input-message-btn'>Send Message <FontAwesomeIcon icon={faComment}/></button>
            </div>
        </div>
    )
}
import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from '../../store'
import { TOGGLE_INPUT_MESSAGE_BOX } from '../../store/constants'
import './style.scss'

export const NewMessageBox = () => {
    const dispatch = useDispatch()
    const toggleInputBox = React.useCallback(() => {
        dispatch({
            type: TOGGLE_INPUT_MESSAGE_BOX,
            visible: false
          });
    }, [])

    return (
        <div className='message-box'>
            <FontAwesomeIcon className='close-icon-btn' icon={faTimes} onClick={toggleInputBox} />
            <div>
                <textarea rows={3} className='input-message-box' />
                <br />
                <br />
                <button className='input-message-btn'>Send Message &nbsp;<FontAwesomeIcon icon={faComment}/></button>
            </div>
        </div>
    )
}
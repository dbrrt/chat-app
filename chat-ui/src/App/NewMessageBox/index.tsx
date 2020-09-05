import * as React from 'react'
const {useState} = React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from '../../store'
import { TOGGLE_INPUT_MESSAGE_BOX } from '../../store/constants'

import {MessageObject} from '../index.d'

import io from 'socket.io-client'
const ENDPOINT = "http://127.0.0.1:5555"; // TODO: pass in environment variables

import './style.scss'

const INIT_MESSAGE_VALUE = ''

export const NewMessageBox = () => {
    const dispatch = useDispatch()
    const toggleInputBox = React.useCallback(() => {
        dispatch({
            type: TOGGLE_INPUT_MESSAGE_BOX,
            visible: false
          });
    }, [])

    const [message, setMessage] = useState(INIT_MESSAGE_VALUE)

    const sendMessage = React.useCallback(() => {
        const REGEX_URI_IMAGE = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/

        const messageObj: MessageObject = {
            sender: '',
            recipient: '',
            message: {
                payload: message,
                type: message.match(REGEX_URI_IMAGE) ? 'image': 'text'
            },
            ts: new Date().toISOString()
        }

        const socket = io(ENDPOINT);
        socket.emit('MESSAGE_HANDLER', messageObj);

    }, [])

    return (
        <div className='message-box'>
            <FontAwesomeIcon className='close-icon-btn' icon={faTimes} onClick={toggleInputBox} />
            <div>
                <textarea rows={3} className='input-message-box' onChange={(e) => setMessage(e.target.value)} />
                <br />
                <br />
                <button className='input-message-btn' onClick={sendMessage}>Send Message &nbsp;<FontAwesomeIcon icon={faComment}/></button>
            </div>
        </div>
    )
}
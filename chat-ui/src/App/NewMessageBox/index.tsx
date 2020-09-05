import * as React from 'react'
const {useState, useCallback, useEffect} = React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useMappedState } from '../../store'
import { TOGGLE_INPUT_MESSAGE_BOX } from '../../store/constants'
import {ICombinedState} from '../../store/reducers/index.d'

import {IMessage} from '../index.d'

import io from 'socket.io-client'
const ENDPOINT = "http://127.0.0.1:5555"; // TODO: pass in environment variables

import './style.scss'

const INIT_MESSAGE_VALUE = ''

export const NewMessageBox = () => {
    const [message, setMessage] = useState(INIT_MESSAGE_VALUE)
    const dispatch = useDispatch()
    const toggleInputBox = React.useCallback(() => {
        dispatch({
            type: TOGGLE_INPUT_MESSAGE_BOX,
            visible: false
          });
    }, [])

    const {username, room} = useMappedState(
        useCallback(
          (state: ICombinedState) => ({
            inputBoxVisible: state.global.input_message_box_visible,
            modalSettingsVisible: state.global.settings_modal_visible,
            username: state.global.username,
            room: state.global.room,
            users: state.global.connected_users
          }),
          []
        )
    );

    const sendMessage = React.useCallback(() => {
        const REGEX_URI_IMAGE = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|JPG|PNG|GIF)/
        const messageObj: IMessage = {
            sender: username,
            recipient: room,
            message: {
                payload: message,
                type: message.match(REGEX_URI_IMAGE) ? 'image': 'text'
            },
            ts: new Date().toISOString()
        }

        const socket = io(ENDPOINT)
        socket.emit('MESSAGE_HANDLER', messageObj);
        setMessage(INIT_MESSAGE_VALUE)
        
        setTimeout(() => {
            socket.close()
        }, 1000, socket)

    }, [message, username, room])

    return (
        <div className='message-box'>
            <FontAwesomeIcon className='close-icon-btn' icon={faTimes} onClick={toggleInputBox} />
            <div>
                <textarea rows={3} className='input-message-box' onChange={(e) => setMessage(e.target.value)} value={message} />
                <br />
                <br />
                {message.length > 0 && <button className='input-message-btn' onClick={sendMessage}>Send Message &nbsp;<FontAwesomeIcon icon={faComment}/></button>}
            </div>
        </div>
    )
}
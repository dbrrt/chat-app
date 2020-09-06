import * as React from 'react'
const {useEffect, useCallback, useState} = React
import {MessageTile} from '../MessageTile'

import { useMappedState, useDispatch } from '../../store';
import { SET_CHAT_ROOM } from '../../store/constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FabButton } from '../FabButton';
import { NewMessageBox } from '../NewMessageBox';

import {ICombinedState} from '../../store/reducers/index.d'
import {IMessage} from '../index.d'

import io from 'socket.io-client'
const ENDPOINT = "http://127.0.0.1:5555"; // TODO: pass in environment variables

const MESSAGES_ROOM_INIT: IMessage[] = []
export const RoomShell = () => {
    const dispatch = useDispatch()
    const [messages, setMessages] = useState(MESSAGES_ROOM_INIT)

    const {room, inputBoxVisible, username, clockFormat } = useMappedState(
        useCallback(
          (state: ICombinedState) => ({
            inputBoxVisible: state.global.input_message_box_visible,
            modalSettingsVisible: state.global.settings_modal_visible,
            username: state.global.username,
            room: state.global.room,
            clockFormat: state.global.clock_display
          }),
          []
        )
    );

    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.on('MESSAGE_BROADCAST', (message: IMessage) => {
            setMessages([ ...messages, message ])
        })
        
        if (room) {
            const ROOM_ID = [username, room].sort().join('___').toUpperCase()
            socket.emit('join', ROOM_ID)
        }

        const cleanup = () => {
            socket.close()
        };

        return cleanup
    }, [room, username, messages])


    const unsetRoom = React.useCallback(() => {
        dispatch({
            type: SET_CHAT_ROOM,
            room: null
        })
    }, [])

    return (
        <>
            <div className='primary-btn' onClick={unsetRoom}>Go Back &nbsp;<FontAwesomeIcon icon={faChevronLeft} /></div>
            <h2><FontAwesomeIcon icon={faUserAlt} /> {room}</h2>
            <br />
            <br />
            <div className='messages-container'>
                {messages.map((el: any, key: number) => {
                    return (
                        <MessageTile
                            key={key}
                            timestamp={el.ts}
                            sender={el.sender}
                            messageType={el.message.type}
                            messagePayload={el.message.payload}
                            isSender={el?.sender === username}
                            isRecipient={el?.sender !== username}
                            formatDate={clockFormat}
                        />
                        
                    )
                })}
            </div>
            <FabButton />
            {inputBoxVisible && <NewMessageBox />}
        </>
    )
}

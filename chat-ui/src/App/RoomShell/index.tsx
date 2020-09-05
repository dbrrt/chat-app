import * as React from 'react'
const {useEffect, useCallback} = React
import {MessageTile} from '../MessageTile'
import {ICombinedState} from '../../store/reducers/index.d'
import { useDispatch, useMappedState } from '../../store';
import { SET_CHAT_ROOM, ADD_MESSAGE } from '../../store/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FabButton } from '../FabButton';
import { NewMessageBox } from '../NewMessageBox';

import {IMessage} from '../index.d'

import io from 'socket.io-client'
const ENDPOINT = "http://127.0.0.1:5555"; // TODO: pass in environment variables

export const RoomShell = () => {

    const dispatch = useDispatch()

    const {room, inputBoxVisible, username, messages } = useMappedState(
        useCallback(
          (state: ICombinedState) => ({
            inputBoxVisible: state.global.input_message_box_visible,
            modalSettingsVisible: state.global.settings_modal_visible,
            username: state.global.username,
            room: state.global.room,
            messages: state.global.messages_rooms
          }),
          []
        )
    );

    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.on('MESSAGE_BROADCAST', (message: IMessage) => {
            dispatch({
                type: ADD_MESSAGE,
                message
            })
        })

        const ROOM_ID = [username, room].sort().join('___').toUpperCase()
        
        if (room) {
            socket.emit('join', ROOM_ID)
        }

        const cleanup = () => {
            socket.close()
        };

        return cleanup
    }, [room, username])


    const unsetRoom = React.useCallback(() => {
        dispatch({
            type: SET_CHAT_ROOM,
            room: null
        })
    }, [])


    return (
        <>
            <div className='primary-btn' onClick={unsetRoom}>Go Back &nbsp;<FontAwesomeIcon icon={faChevronLeft} /></div>
            <h2>Chat: {room}</h2>
            <hr />
            <div className='messages-container'>
                {messages.map((el: any, key: number) => {
                    return (
                        <MessageTile
                            key={key}
                            timestamp={new Date().toISOString()}
                            username={el.username}
                            message={el.message}
                            isSender={el?.sender === username}
                            isRecipient={el?.sender === username}
                        />
                        
                    )
                })}
            </div>
            <FabButton />
            {inputBoxVisible && <NewMessageBox />}
        </>
    )
}
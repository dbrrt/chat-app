import * as React from 'react'
const {useCallback, useEffect} = React
import {MessageTile} from '../MessageTile'
import {NewMessageBox} from '../NewMessageBox'
import {FabButton} from '../FabButton'
import {ModalSettings} from '../ModalSettings'
import {ConfigureUser} from '../ConfigureUser'
import {ChatRooms} from '../ChatRooms'

import GithubCorner from 'react-github-corner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faWrench, faSignOutAlt, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { TOGGLE_MODAL_SETTINGS, SET_CHAT_ROOM, SIGN_OUT, ADD_MESSAGE } from "../../store/constants";
import { useMappedState, useDispatch } from "../../store";

import {IMessage} from '../index.d'
import {ICombinedState} from '../../store/reducers/index.d'

import io from 'socket.io-client'
const ENDPOINT = "http://127.0.0.1:5555"; // TODO: pass in environment variables

import './style.scss'

export const Container = () => {
    const dispatch = useDispatch()
    const {room, inputBoxVisible, modalSettingsVisible, username, messages } = useMappedState(
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
        if (username) {
            const socket = io(ENDPOINT);
            setInterval((username: string) => {
                socket.emit('USER_HEARTBEAT', username);
            }, 2500, username);

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

            socket.on('CONNECTED_USERS', (users: string[]) => {
                dispatch({
                    type: 'SET_CONNECTED_USERS',
                    users
                })
            })


        }
    }, [username, room])

    
    const toggleSettings = useCallback(() => {
        dispatch({
            type: TOGGLE_MODAL_SETTINGS,
            visible: true
        })
    }, [])

    const unsetRoom = React.useCallback(() => {
        dispatch({
            type: SET_CHAT_ROOM,
            room: null
        })
    }, [])

    const signOut = React.useCallback(() => {
        dispatch({
            type: SIGN_OUT
        })
    }, [])


    return (
        <div className='app-container'>
            <h3 style={{ marginLeft: '60px' }}><FontAwesomeIcon icon={faComment} /> Chat App</h3>
            <div className='settings-btn' onClick={toggleSettings}>Settings &nbsp;<FontAwesomeIcon icon={faWrench} /></div>
            {username && <div className='signout-btn' onClick={signOut}>Sign Out &nbsp;<FontAwesomeIcon icon={faSignOutAlt} /></div>}
            <GithubCorner href="https://github.com/dbrrt/chat-app" direction='left' />
            <br />
            <br />

            {modalSettingsVisible && <ModalSettings />}


            {username === null ?
                
                <ConfigureUser />
            : (
                <>
                    {room === null ? <ChatRooms />
                    : (
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
                    )}
                    

                </>
            )}

            
        </div>
    )

}
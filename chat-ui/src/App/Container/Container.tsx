import * as React from 'react'
const {useCallback, useEffect} = React
import {ModalSettings} from '../ModalSettings'
import {ConfigureUser} from '../ConfigureUser'
import {ChatRooms} from '../ChatRooms'
import {RoomShell} from '../RoomShell'

import GithubCorner from 'react-github-corner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faWrench, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { TOGGLE_MODAL_SETTINGS, SIGN_OUT } from "../../store/constants";
import { useMappedState, useDispatch } from "../../store";

import {ICombinedState} from '../../store/reducers/index.d'

import io from 'socket.io-client'
const ENDPOINT = "http://127.0.0.1:5555"; // TODO: pass in environment variables

import './style.scss'

export const Container = () => {
    const dispatch = useDispatch()
    const {room, modalSettingsVisible, username } = useMappedState(
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
        if (username) {
            setInterval((username: string) => {
                socket.emit('USER_HEARTBEAT', username);
            }, 2500, username);

            socket.on('CONNECTED_USERS', (users: string[]) => {
                dispatch({
                    type: 'SET_CONNECTED_USERS',
                    users
                })
            })
        }
        const cleanup = () => {
            socket.close()
        };
        return cleanup
    }, [username, room])

    
    const toggleSettings = useCallback(() => {
        dispatch({
            type: TOGGLE_MODAL_SETTINGS,
            visible: true
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
            {username === null 
            ? <ConfigureUser />
            : room === null ? <ChatRooms /> : <RoomShell />}

        </div>
    )

}
import * as React from 'react'
const { useCallback, useEffect } = React

import {useDispatch, useMappedState} from '../../store'
import {ICombinedState} from '../../store/reducers/index.d'
import {SET_CHAT_ROOM} from '../../store/constants'

const URI_GREEN_LIGHT = 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Green_Light_Icon.svg'

import io from 'socket.io-client'
const ENDPOINT = "http://127.0.0.1:5555"; // TODO: pass in environment variables

import './style.scss'

export const ChatRooms = () => {
    const dispatch = useDispatch()

    const setRoom = React.useCallback((room: string) => {
        dispatch({
            type: SET_CHAT_ROOM,
            room
        })
    }, [])
    const {username, users, room} = useMappedState(
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

      useEffect(() => {
        const socket = io(ENDPOINT);
        if (username) {
            const itv = setInterval((username: string) => {
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
            clearInterval(itv)
            socket.close()
        };
        return cleanup
    }, [username, room])

    const ROOMS = Array.from(new Set(users?.filter((el: string) => el !== username))) || []

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Chat rooms {ROOMS!.length > 0 ? <span>({ROOMS!.length})</span> : null}</h2>
            <br />
            <br />
            {ROOMS!.map((el: string, key: number) => {
                return (
                    <div className='contact-block' key={key} style={{ padding: '2em' }} onClick={() => setRoom(el)}>
                        <span ><img src={URI_GREEN_LIGHT} width='10' /> &nbsp;{el}</span>
                    </div>
                )
            })}
        </div>
    )
}

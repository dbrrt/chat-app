import * as React from 'react'
import {useDispatch, useMappedState} from '../../store'
import {ICombinedState} from '../../store/reducers/index.d'
import {SET_CHAT_ROOM} from '../../store/constants'

const URI_GREEN_LIGHT = 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Green_Light_Icon.svg'

import { useCallback } from 'react'

import './style.scss'


export const ChatRooms = () => {
    const dispatch = useDispatch()

    const setRoom = React.useCallback((room: string) => {
        dispatch({
            type: SET_CHAT_ROOM,
            room
        })
    }, [])
    const {username, users} = useMappedState(
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

    const ROOMS = Array.from(new Set(users?.filter((el: string) => el !== username))) || []

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Chat rooms {ROOMS!.length > 0 ? <span>({ROOMS!.length})</span> : null}</h2>
            <hr />
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
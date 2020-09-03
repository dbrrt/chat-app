import * as React from 'react'
import {useDispatch} from '../../store'
import {SET_CHAT_ROOM} from '../../store/constants'

const URI_GREEN_LIGHT = 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Green_Light_Icon.svg'

import './style.scss'

export const ChatRooms = () => {
    const dispatch = useDispatch()

    const setRoom = React.useCallback((room: string) => {
        dispatch({
            type: SET_CHAT_ROOM,
            room
        })
    }, [])


    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Connected users</h1>
            <br />
            {['guest0'].map((el: string, key: number) => {
                return (
                    <div className='contact-block' key={key} style={{ padding: '2em' }} onClick={() => setRoom(el)}>
                        <span ><img src={URI_GREEN_LIGHT} width='10' /> &nbsp;{el}</span>
                    </div>
                )
            })}
        </div>
    )
}
import * as React from 'react'
import {IMessageTile} from '../index.d'
import './style.scss'

export const MessageTile = ({timestamp, username, message}: IMessageTile) => {
    return <div className='message-tile'>
        {username}  {timestamp} {JSON.stringify(message)}
        {/* <MessageTileStyled /> */}
    </div>
}

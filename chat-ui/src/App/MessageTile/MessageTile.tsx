import * as React from 'react'
import {IMessageTile} from '../index.d'
import './style.scss'

export const MessageTile = ({timestamp, username, message, isRecipient}: IMessageTile) => {
    return (
        <div className='message-tile-row' style={{ width: '100%', float: 'left' }}>
            <div className={`message-tile message-tile-${isRecipient ? 'left' : 'right'}`}>
                {username}  {timestamp}
                {message?.message?.type === 'image' ? <img src={message?.message?.payload} /> : JSON.stringify(message)}
            </div>
        </div>
    )
}
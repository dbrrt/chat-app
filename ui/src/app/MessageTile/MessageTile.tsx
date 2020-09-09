import * as React from 'react'
import {IMessageTile} from '../index.d'
import './style.scss'

/*
    `getFormattedDate` will return the date with desired format
    @isoTs: string - timestamp, iso format
    @format: string (12h|24h)
    @separator: string, character or string to be displayed between hours and minutes
*/
const getFormattedDate = (isoTs: string, format: string, separator: string = ' ') => {
    const dt = new Date(isoTs)
    const dtH = format === '24h' ? dt.getHours(): dt.getHours() % 12
    const paddingHours = dtH === 0 || dtH < 10 ? '0': ''
    const dtM = dt.getMinutes()
    const paddingMinutes = dtM === 0 || dtM < 10 ? '0': ''
    const suffixTime = format === '12h' ? ` ${dt.getHours() > 12 ? 'PM': 'AM'}` : ''
    return `${paddingHours}${dtH}h${separator}${paddingMinutes}${dtM}min ${suffixTime}`
}

export const MessageTile = ({sender, isRecipient, messageType, messagePayload, timestamp, formatDate}: IMessageTile) => (
    <div className='message-tile-row'>
        <div className={`message-tile message-tile-${isRecipient ? 'left' : 'right'}`}>
            <span className='message-tile-meta'>{getFormattedDate(timestamp, formatDate)} - <i className='message-tile-sender-meta'>Sent by {sender}</i></span>
            <br />
            {messageType === 'image' 
                ? <img src={`${messagePayload}`} style={{ 'maxWidth': '-moz-available' }} />
                : messagePayload
            }
        </div>
    </div>
)
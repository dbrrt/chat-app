import * as React from 'react'
import {IMessageTile} from '../index.d'

export const MessageTile = ({timestamp, username, message}: IMessageTile) => {
    return <>
        {username}  {timestamp} {JSON.stringify(message)}
    </>
}
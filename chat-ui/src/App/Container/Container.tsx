import * as React from 'react'
import {MessageTile} from '../MessageTile'
import {IContainer} from '../index.d'

export const Container = ({messages}: IContainer) => {
    return <>
        Chat App
        <hr />
        {messages.map((el: any, key: number) => {
            return (
                <MessageTile
                    key={key}
                    timestamp={new Date().toISOString()}
                    username={el.username}
                    message={el.message}
                />
            )
        })}
    </>

}
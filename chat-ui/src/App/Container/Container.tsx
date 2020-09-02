import * as React from 'react'
import {MessageTile} from '../MessageTile'
import {NewMessageBox} from '../NewMessageBox'
import {IContainer} from '../index.d'
import GithubCorner from 'react-github-corner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

export const Container = ({messages}: IContainer) => {

    const currentUser = 'guest001'

    return (
        <div className='app-container'>
            <h3>&nbsp;&nbsp;<FontAwesomeIcon icon={faComment} /> Chat App</h3>
            <GithubCorner href="https://github.com/dbrrt/chat-app" />
            <br />
            <br />
            <div className='messages-container'>
                {messages.map((el: any, key: number) => {
                    return (
                        <MessageTile
                            key={key}
                            timestamp={new Date().toISOString()}
                            username={el.username}
                            message={el.message}
                            isSender={el?.sender === currentUser}
                            isRecipient={el?.sender === currentUser}
                        />
                        
                    )
                })}
            </div>
            <NewMessageBox />
        </div>
    )

}
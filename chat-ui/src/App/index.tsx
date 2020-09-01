import * as React from 'react'
import {Container} from './Container'

const messages = [
    {username: 'guest 007',
        message: {
            type: 'text',
            payload: 'Hello'
        }
    },
    {username: 'guest 001',
        message: {
            type: 'text',
            payload: 'How are you?'
        }
    },

]

export const App = () => <Container messages={messages} />
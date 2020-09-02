import * as React from 'react'
import {Container} from './Container'

const messages = [
    {
        sender: 'guest002',
        recipient: 'guest001',
        message: {
            type: 'text',
            payload: 'Hello'
        }
    },
    {
        sender: 'guest001',
        recipient: 'guest002',
        message: {
            type: 'text',
            payload: 'How are you?'
        }
    },
    {
        sender: 'guest002',
        recipient: 'guest001',
        message: {
            type: 'text',
            payload: 'Hello'
        }
    },

]

export const App = () => <Container messages={messages} />
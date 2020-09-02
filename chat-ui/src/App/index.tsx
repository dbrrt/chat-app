import * as React from 'react'
import {Container} from './Container'
import { StoreContext, store } from "../store";

const messages = [
    {
        sender: 'guest002',
        recipient: 'guest001',
        message: {
            type: 'text',
            payload: 'Hello'
        }
    },
    // {
    //     sender: 'guest001',
    //     recipient: 'guest002',
    //     message: {
    //         type: 'text',
    //         payload: 'How are you?'
    //     }
    // },
    // {
    //     sender: 'guest002',
    //     recipient: 'guest001',
    //     message: {
    //         type: 'text',
    //         payload: 'Hello'
    //     }
    // },
    // {
    //     sender: 'guest001',
    //     recipient: 'guest002',
    //     message: {
    //         type: 'text',
    //         payload: 'How are you?'
    //     }
    // },
    // {
    //     sender: 'guest002',
    //     recipient: 'guest001',
    //     message: {
    //         type: 'text',
    //         payload: 'Hello'
    //     }
    // },
    // {
    //     sender: 'guest002',
    //     recipient: 'guest001',
    //     message: {
    //         type: 'text',
    //         payload: 'Hello'
    //     }
    // },
    // {
    //     sender: 'guest001',
    //     recipient: 'guest002',
    //     message: {
    //         type: 'text',
    //         payload: 'How are you?'
    //     }
    // },
    // {
    //     sender: 'guest002',
    //     recipient: 'guest001',
    //     message: {
    //         type: 'text',
    //         payload: 'Hello'
    //     }
    // },
    // {
    //     sender: 'guest001',
    //     recipient: 'guest002',
    //     message: {
    //         type: 'text',
    //         payload: 'How are you?'
    //     }
    // },
    // {
    //     sender: 'guest002',
    //     recipient: 'guest001',
    //     message: {
    //         type: 'text',
    //         payload: 'Hello'
    //     }
    // },
]

export const App = () => (
    <StoreContext.Provider value={store}>
        <Container messages={messages} />
    </StoreContext.Provider>
)
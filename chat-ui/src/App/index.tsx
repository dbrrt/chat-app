import * as React from 'react'
import {Container} from './Container'
import { StoreContext, store } from "../store";
import {MessageObject} from './index.d'

const messages: MessageObject[] = []

export const App = () => (
    <StoreContext.Provider value={store}>
        <Container messages={messages} />
    </StoreContext.Provider>
)
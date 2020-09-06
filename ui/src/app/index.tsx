import * as React from 'react'
import {Container} from './Container'
import { StoreContext, store } from "../store";

export const App = () => (
    <StoreContext.Provider value={store}>
        <Container />
    </StoreContext.Provider>
)
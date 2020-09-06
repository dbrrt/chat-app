import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'

import {useDispatch} from '../../store'
import {SET_UNSAFE_USERNAME} from '../../store/constants'

import './style.scss'

export const ConfigureUser = () => {
    const [username, setUsername] = React.useState('')
    const dispatch = useDispatch()
    const setUnsafeUsername = React.useCallback(() => {
        dispatch({
            type: SET_UNSAFE_USERNAME,
            username
        })
    }, [username])

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome! <FontAwesomeIcon icon={faFlagCheckered}  /></h1>
            <br />
            <h2>Pick a username</h2>
            <input className='input-username' onChange={(e: any) => setUsername(e.target.value)} />
            <br /><br />
            {username.length > 0 && <button onClick={setUnsafeUsername} className='save-username-btn'>View rooms &nbsp;<FontAwesomeIcon icon={faRocket}/></button>}
        </div>
    )
}
import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

import {useDispatch} from '../../store'
import {SET_UNSAFE_USERNAME} from '../../store/constants'

export const ConfigureUser = () => {
    const [username, setUsername] = React.useState('')
    const dispatch = useDispatch()

    const setUnsafeUsername = React.useCallback((e: any) => {
        dispatch({
            type: SET_UNSAFE_USERNAME,
            username
        })
    }, [username])

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome!</h1>
            <br />
            <h2>Select an username</h2>
            <input className='input-username' onChange={(e: any) => setUsername(e.target.value)} />
            <br /><br />
            {username.length > 0 && <button onClick={setUnsafeUsername} className='save-username-btn'>Get Started &nbsp;<FontAwesomeIcon icon={faRocket}/></button>}
        </div>
    )
}
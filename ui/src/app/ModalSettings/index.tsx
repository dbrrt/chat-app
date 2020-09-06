import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faWrench } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from 'react'
import { TOGGLE_MODAL_SETTINGS, TOGGLE_CLOCK_DISPLAY, TOGGLE_KEYBOARD_SEND_SHORTCUT, RESET_MODAL_SETTINGS_CONFIG } from '../../store/constants'
import {useDispatch, useMappedState} from '../../store'
import {ICombinedState} from '../../store/reducers/index.d'

import './style.scss'


export const ModalSettings = () => {
    const dispatch = useDispatch()

    const toggleSettings = useCallback(() => {
        dispatch({
            type: TOGGLE_MODAL_SETTINGS,
            visible: false
        })
    }, [])

    const {clockDisplay, quickMessage} = useMappedState(
        useCallback(
          (state: ICombinedState) => ({
            clockDisplay: state.global.clock_display,
            quickMessage: state.global.quick_message
          }),
          []
        )
      );

    const updateClockDisplay = React.useCallback((e: any) => {
        const displayValue = e?.target.value
        dispatch({
            type: TOGGLE_CLOCK_DISPLAY,
            value: displayValue
        })
    }, [])

    const updateKeyboardShortcutActivate = React.useCallback((e: any) => {
        const displayValue = e?.target.value
        dispatch({
            type: TOGGLE_KEYBOARD_SEND_SHORTCUT,
            value: displayValue
        })
    }, [])

    const resetSettings = React.useCallback(() => {
        dispatch({
            type: RESET_MODAL_SETTINGS_CONFIG
        })
    }, [])

    return (
        <div className='modal-settings'>
            <FontAwesomeIcon className='close-icon-btn' icon={faTimes} onClick={toggleSettings} />
            <div className='modal-settings-content'>
                <h1>Settings</h1>
                <br />
                <hr />
                <h2>Clock Display</h2>

                <label className="container">12H
                    <input type="radio"  name="clock_display" value="12h" onChange={updateClockDisplay} checked={clockDisplay === '12h'} />
                    <span className="checkmark"></span>
                </label>

                <label className="container">24H
                    <input type="radio"  name="clock_display" value="24h" onChange={updateClockDisplay} checked={clockDisplay === '24h'} />
                    <span className="checkmark"></span>
                </label>

                <br /> <br/>

                <h2>Send messages on Pressing Enter</h2>

                <label className="container">Off
                    <input type="radio"  name="shortcut_send_msg" value="false" onChange={updateKeyboardShortcutActivate} checked={JSON.stringify(quickMessage) === 'false'} />
                    <span className="checkmark"></span>
                </label>

                <label className="container">On
                    <input type="radio"  name="shortcut_send_msg" value="true" onChange={updateKeyboardShortcutActivate} checked={JSON.stringify(quickMessage) === 'true'} />
                    <span className="checkmark"></span>
                </label>

                <br /> <br/>
                <br /> <br/>

                <div className='settings-reset' onClick={resetSettings}>Reset Settings &nbsp;<FontAwesomeIcon icon={faWrench} /></div>
            </div>
        </div>
    )
}
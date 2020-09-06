import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

import { useDispatch } from "../../store";
import { TOGGLE_INPUT_MESSAGE_BOX } from "../../store/constants";

export const FabButton = () => {
    const dispatch = useDispatch()
    const toggleInputBox = React.useCallback(() => {
        dispatch({
            type: TOGGLE_INPUT_MESSAGE_BOX,
            visible: true
          });
    }, [])

    return (
        <div className='fab-toggle-input-message' onClick={toggleInputBox}>
            <FontAwesomeIcon icon={faComment} style={{ paddingTop: '10px' }} />
        </div>
    )
}
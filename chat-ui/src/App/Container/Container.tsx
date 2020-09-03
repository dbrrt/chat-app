import * as React from 'react'
const {useCallback} = React
import {MessageTile} from '../MessageTile'
import {NewMessageBox} from '../NewMessageBox'
import {FabButton} from '../FabButton'
import {ModalSettings} from '../ModalSettings'

import GithubCorner from 'react-github-corner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faWrench } from '@fortawesome/free-solid-svg-icons'

import { TOGGLE_MODAL_SETTINGS } from "../../store/constants";
import { useMappedState, useDispatch } from "../../store";
import {ICombinedState} from '../../store/reducers/index.d'
import {IContainer} from '../index.d'

import './style.scss'

export const Container = ({messages}: IContainer) => {
    const currentUser = 'guest001'
    const dispatch = useDispatch()
    const {inputBoxVisible, modalSettingsVisible} = useMappedState(
        useCallback(
          (state: ICombinedState) => ({
            inputBoxVisible: state.global.input_message_box_visible,
            modalSettingsVisible: state.global.settings_modal_visible
          }),
          []
        )
      );
    
    const toggleSettings = useCallback(() => {
        dispatch({
            type: TOGGLE_MODAL_SETTINGS,
            visible: true
        })
    }, [])
    

    return (
        <div className='app-container'>
            <h3 style={{ marginLeft: '60px' }}><FontAwesomeIcon icon={faComment} /> Chat App</h3>
            <div className='settings-btn' onClick={toggleSettings}>Settings &nbsp;<FontAwesomeIcon icon={faWrench} /></div>
            <GithubCorner href="https://github.com/dbrrt/chat-app" direction='left' />
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
            <FabButton />
            {inputBoxVisible && <NewMessageBox />}
            {modalSettingsVisible && <ModalSettings />}
        </div>
    )

}
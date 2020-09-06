import {IMessage} from '../../../app/index.d'

export interface IGlobalState {
    input_message_box_visible: boolean;
    settings_modal_visible: boolean;
    clock_display: string;
    quick_message: boolean;
    username: null | string;
    room: null | string;
    connected_users: string[] | null;
    messages_rooms: IMessage[];
  }
  
  export type Action = |
  {
    type: 'TOGGLE_INPUT_MESSAGE_BOX'
    visible: boolean
  } |
  {
    type: 'TOGGLE_MODAL_SETTINGS'
    visible: boolean
  } |
  {
    type: 'TOGGLE_CLOCK_DISPLAY'
    value: string
  } |
  {
    type: 'TOGGLE_KEYBOARD_SEND_SHORTCUT'
    value: string
  } |
  {
    type: 'RESET_MODAL_SETTINGS_CONFIG'
  }|
  {
    type: 'SET_UNSAFE_USERNAME'
    username: string | null
  } |
  {
    type: 'SET_CHAT_ROOM'
    room: string | null
  } |
  {
    type: 'SIGN_OUT'
  } |
  {
    type: 'SET_CONNECTED_USERS'
    users: string[] | null
  }
  
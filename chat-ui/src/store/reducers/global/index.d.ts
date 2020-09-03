export interface IGlobalState {
    input_message_box_visible: boolean;
    settings_modal_visible: boolean;
    clock_display: string;
    quick_message: boolean;
    username: null | string;
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
  } 
  
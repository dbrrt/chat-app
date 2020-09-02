export interface IGlobalState {
    input_message_box_visible: boolean
  }
  
  export type Action = {
    type: 'TOGGLE_INPUT_MESSAGE_BOX'
    visible: boolean
  }
  
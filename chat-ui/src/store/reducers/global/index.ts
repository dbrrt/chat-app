import {TOGGLE_INPUT_MESSAGE_BOX} from './constants'
import {IGlobalState, Action} from './index.d'

const INIT_STATE: IGlobalState = {
    input_message_box_visible: false
}

const reducer = (state: IGlobalState = INIT_STATE, action: Action) => {
  switch (action.type) {
    case TOGGLE_INPUT_MESSAGE_BOX: {
      return {
        ...state,
        input_message_box_visible: action.visible
      }
    }

    default:
      return state
  }
}

export {reducer as global}

import {
    TOGGLE_INPUT_MESSAGE_BOX,
    TOGGLE_MODAL_SETTINGS,
    TOGGLE_CLOCK_DISPLAY,
    TOGGLE_KEYBOARD_SEND_SHORTCUT,
    RESET_MODAL_SETTINGS_CONFIG,
    SET_UNSAFE_USERNAME,
    SET_CHAT_ROOM,
    SIGN_OUT
} from './constants'
import {IGlobalState, Action} from './index.d'


const SETTINGS_MODAL_INIT = {
    clock_display: '12h',
    quick_message: false
}

const SETTINGS_USER_INIT = {
    username: null
}

const SETTINGS_ROOM_INIT = {
    room: null
}

const INIT_STATE: IGlobalState = {
    input_message_box_visible: false,
    settings_modal_visible: false,
    ...SETTINGS_MODAL_INIT,
    ...SETTINGS_USER_INIT,
    ...SETTINGS_ROOM_INIT
}

const reducer = (state: IGlobalState = INIT_STATE, action: Action) => {
  switch (action.type) {
    case TOGGLE_INPUT_MESSAGE_BOX: {
        return {
            ...state,
            input_message_box_visible: action.visible
        }
    }

    case TOGGLE_MODAL_SETTINGS: {
        return {
            ...state,
            settings_modal_visible: action.visible
        }
    }

    case TOGGLE_CLOCK_DISPLAY: {
        return {
            ...state,
            clock_display: action.value
        }
    }
    
    case TOGGLE_KEYBOARD_SEND_SHORTCUT: {
        return {
            ...state,
            quick_message: JSON.parse(action.value)
        }
    }

    case RESET_MODAL_SETTINGS_CONFIG: {
        return {
            ...state,
            ...SETTINGS_MODAL_INIT
        }
    }

    case SET_UNSAFE_USERNAME: {
        return {
            ...state,
            username: action.username
        }
    }

    case SET_CHAT_ROOM: {
        return {
            ...state,
            room: action.room
        }
    }

    case SIGN_OUT: {
        return {
            ...state,
            ...SETTINGS_USER_INIT,
            ...SETTINGS_ROOM_INIT
        }
    }

    default:
      return state
  }
}

export {reducer as global}

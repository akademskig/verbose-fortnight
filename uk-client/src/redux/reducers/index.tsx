import { combineReducers} from 'redux'
import {
    RESIZE_WINDOW,
} from '../actions'

const resizeWindow = (state = {}, action: any) =>{
    switch (action.type) {
        case RESIZE_WINDOW:
            return action.width
        default:
            return state
    }
}

const app = combineReducers({
    resizeWindow
})

export default app
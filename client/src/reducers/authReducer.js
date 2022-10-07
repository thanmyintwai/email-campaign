import { FETCH_USER } from '../actions/types'

const initialState = {
    isLogIn: false
}

export default function(state = initialState, action){

    switch(action.type){
        case 'FETCH_USER':
            return {...state, ...action.payload }            
        default:
            return state
    }
}
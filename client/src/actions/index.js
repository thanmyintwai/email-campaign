import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => async (dispatch ) =>{
    const response = await axios.get('/api/current_user')
    //console.log('I am calling')
    dispatch({ type: 'FETCH_USER', payload: response.data})
    //dispatch({type: 'FETCH_USER'})
}

export const handleToken = (token) => async (dispatch) =>{
    const response = await axios.post('/api/stripe', token)

    dispatch({ type: 'FETCH_USER', payload: response.data})

}
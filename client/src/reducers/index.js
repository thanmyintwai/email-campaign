import { combineReducers } from 'redux'
import authReducer from './authReducer'
import surveyReducers from './surveyReducers'
import { reducer as rexduxForm } from 'redux-form'

export default combineReducers({
    auth: authReducer,
    surveys: surveyReducers,
    form: rexduxForm, 
})
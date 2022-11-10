import _ from 'lodash';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

//onCancel - component property (from parent)
//formVales - from Redux Store 
//submitSurvey - Action
//history - get it from withRouter (react-router-dom) - programatic routing
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    {/* <label>Survey Title</label>
    <div>{formValues.title}</div> */}
    
    //const reviewFields = _.map(formFields, (field)=>{
    const reviewFields = _.map(formFields, ({ name, label })=>{
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    });

    return(
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className='yellow darken-3 white-text btn-flat' onClick={onCancel}>Back</button>
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}>Send Survey<i className="material-icons right">email</i></button>
        </div>
    )    
}
 
const mapStateToProps = state =>{
    return {
        formValues: state.form.surveyForm.values
    }
}
export default connect(mapStateToProps, actions )(withRouter(SurveyFormReview));
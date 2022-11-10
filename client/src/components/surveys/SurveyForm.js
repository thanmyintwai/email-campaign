//SurveyForm shows a form for a user to add input
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

//helper from redux-form which help to communicate with store 
//similar to connect function in react-redux 
//Field - represent any type of html input element
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import _ from 'lodash'
import validateEmails from '../../utils/validateEmails';

import formFields from './formFields';
const FIELDS = [
    { label: 'Survey Title', name: 'title'},
    { label: 'Subject Line', name: 'subject'},
    { label: "Email Body", name: 'body'},
    { label: 'Recipient List', name: 'recipients'}
]

class SurveyForm extends Component {
  renderFields () {
      /* return (
          <div>
              <Field type="text" name="title" component={SurveyField} label="Survey Title" />
          </div>
      ) */
      return _.map(formFields, ({label, name})=>{
          return (
            <Field key={name} type="text" name={name} component={SurveyField} label={label} />
          )
      })
  }  

  render() {
    return (
      <div>
          <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
           {/*  <Field name='surveyTitle' component='input' type='text'  /> */}
            {this.renderFields()}
            <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
            <button type='submit' className='teal btn-flat right white-text' >
                Next
                <i className='material-icons right'>done</i>
            </button>
          </form>
      </div>
    )
  }
}

//Validation is always when the form is mounted on the screen
//so there will always be catch errors, that's means we need to find appropirate way to deal with the error
//not immediately show the error to the screen, as it make no sense as we haven't added any the data in the form 
//The best way to solve is that the error is show after user have touched the field and the error is there 
//values is getting from onSubmit callback above 
const validate = (values) => {
    const errors = {};
    
   
  
    /* if (!values.title) {
        errors.title = 'You must provide a title';
      } */
    
      //forEach functionality by loadash 
    _.each(formFields, ({ name }) => {
      if (!values[name]) {
        errors[name] = 'You must provide a value';
      }
    });

     //if no emails have been provided, we will give empty string to the validateEmail utiltites
    //otherewise, it will raise an error (.split)
    
    errors.recipients = validateEmails(values.recipients || '');
    //{ "recipients" : 'These emials are invalie', title: 'you must provide a value' ...}
    //console.log(errors)

    return errors;
  }

//similar to connect 
export default reduxForm({
    validate, 
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm)

//redux form helper
//destroyOnUnmount == false ==> don't dump the value even the form is not shown on the screen 
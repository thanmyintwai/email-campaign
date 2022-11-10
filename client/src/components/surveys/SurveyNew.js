//SurveyNew shows SurveyForm and 
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import SruveyFormReview from './SruveyFormReview';

class SurveyNew extends Component {
  
    state = { showFormReview: false };

    renderContent(){
        if(this.state.showFormReview){
            return(
                <SruveyFormReview onCancel={()=> this.setState({ showFormReview: false })} />
            )
        }
        else{
            return(
                <SurveyForm onSurveySubmit={()=> this.setState({ showFormReview: true})} />
            ) 
        }
    }
    
  render() {
    return (
      <div>
         { this.renderContent() }
      </div>
    )
  }
}

export default reduxForm({
    form: 'surveyForm',
    //destroyOnUnmount: true -> default
})(SurveyNew)
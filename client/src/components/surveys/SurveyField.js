//SurveyField contains logic to render a single label and text input

//get from Field
//error is getting from custom validation defined in SurveyForm
const SurveyField = ({input, label, meta: {error, touched}}) => {
    //console.log(props)
    //console.log(meta)
    return ( 
    <div>
        <label>{label}</label>
        {/* {...input} is equal to onBlur={input.onBlur}, onChange={input.Onchange} */}
        <input {...input} style={ { marginBottom: '5px'}} />
        <div className="red-text" style={{marginBottom: '20px'}}>
            {/* if touched is true, error will shown/return  */}
            {touched && error}
        </div>
    </div> );
}
 
export default SurveyField;


---
title: My Redux Form Note
date: 2023-09-25
tags:

---

Redux Form is a library that helps you manage form state in Redux. It streamlines the process of syncing form data with the Redux store, handling form submission, and validating inputs. Redux Form has seen a decrease in popularity due to the rise of alternatives like Formik and React Hook Form, but it's still a powerful tool with many legacy projects using it.


Here's a brief introduction to Redux Form and a basic example:


### Integration Steps:


**Installation**:


```shell
npm install redux-form
```


**Setup**:
In your main reducer file:


```javascript
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  // ... other reducers
  form: formReducer // mounted under "form"
});
```


**Creating the Form**:
Redux Form exports a `reduxForm()` function which is similar to `connect()` from react-redux. You use it to wrap your form component.


In the code above, `Field` is a component from Redux Form used to connect each form input to the Redux store. The `name` prop corresponds to the key in the form state for that particular field.


```javascript
import React from 'react';
import { Field, reduxForm } from 'redux-form';

let SimpleForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

SimpleForm = reduxForm({
  form: 'simple'  // a unique identifier for this form
})(SimpleForm);

export default SimpleForm;
```


**Accessing Form Values**:
You can access form values in the Redux store under `state.form[formName].values`, where `formName` is the unique name you gave to your form (e.g., 'simple' in our example).


**Submitting the Form**:
Redux Form injects a `handleSubmit` function as a prop which you can use to handle form submission.


```javascript
const submitForm = values => {
  console.log(values);
  // Do something with values, like dispatching an action
}

<SimpleForm onSubmit={submitForm} />
```


**Validation**:
You can easily add validation to your form by passing a validation function to `reduxForm()`:


Now, the error messages can be accessed and displayed in your form component:


```javascript
<Field name="firstName" component="input" type="text" />
{props.errors.firstName && <span>{props.errors.firstName}</span>}
```


```javascript
const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  return errors;
}

SimpleForm = reduxForm({
  form: 'simple',
  validate  // <--- validation function given to redux-form
})(SimpleForm);
```


These are the basics of Redux Form. The library offers a lot more, like handling array fields, form wizard patterns, asynchronous validation, and more. However, as mentioned earlier, the community has been leaning towards other libraries like Formik and React Hook Form for handling form states, mainly due to their simplicity and reduced boilerplate. It's essential to evaluate the needs of your project before deciding on a library.



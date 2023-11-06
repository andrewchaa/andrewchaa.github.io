---
title: Using react-hook-form
date: 2023-06-26
tags:
  - react
---

React Hook Form is a library that helps you validate forms in React. It’s straightforward to use and performant by adopting the use of uncontrolled inputs using `ref`. 


To install React Hook Form, run the following command.


```bash
npm i react-hook-form
```


### Use React Hooks in a form

- Import the `useForm` hook from the package
- `register` the input field into React Hook Form so that it is available for the validation and for tracking
- `handleSubmit` will be connected to the form’s `onSubmit` event to handle submission

```typescript
import { useForm } from `react-hook-form`
const { register, handleSubmit } = useForm()

const onFormSubmit = data => console.log(data)
const onErrors = errors => console.error(errors)

<form onSubmit={handleSubmit(onFormSubmit, onErrors)} >
	<input type="text" name="firstName" {...register('firstName')} />
</form>
```


### Validate forms

- `required` indicates if the field is required or not. If this property is set to `true`, then the field cannot be empty
- `minlength` and `maxlength` set the minimum and maximum length for a string input value
- `min` and `max` set the minimum and maximum values for a numerical value
- `type` indicates the type of the input field; it can be email, number, text, or any other standard HTML input types
- `pattern` defines a pattern for the input value using a regular expression

```typescript
<input name="name" type="text" {...register('name', { required: true } )} />
```


### Example


```typescript
import React from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleRegistration = (data) => console.log(data);
  const handleError = (errors) => {};

  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <div>
        <label>Name</label>
        <input name="name" type="text" {...register('name', registerOptions.name) }/>
        <small className="text-danger">
          {errors?.name && errors.name.message}
        </small>
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          {...register('email', registerOptions.email)}
        />
        <small className="text-danger">
          {errors?.email && errors.email.message}
        </small>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          {...register('password', registerOptions.password)}
        />
        <small className="text-danger">
          {errors?.password && errors.password.message}
        </small>
      </div>
      <button>Submit</button>
    </form>
  );
};
export default RegisterForm;
```


### Integrating Controller Inputs.


This library embraces uncontrolled components and native HTML inputs. However, it's hard to avoid working with external controlled components and it provides a wrapper component, [Controller](https://react-hook-form.com/docs#Controller), to streamline the integration process.


```typescript
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { TextField, Checkbox } from "@material-ui/core"


interface IFormInputs {
  TextField: string
  MyCheckbox: boolean
}


function App() {
  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: {
      MyCheckbox: false,
    },
  })
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="MyCheckbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Checkbox {...field} />}
      />
      <input type="submit" />
    </form>
  )
}
```


You can use `useController` hook instead of `<Controller />` wrapper


```typescript
import React from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { Checkbox, withTheme } from '@group/theme';

interface ConfirmationBoxProps {
  label: string | React.ReactNode;
  isDisabled: boolean;
  isRequired: boolean;
}

const Field = ({
  name,
  control,
  label,
  isDisabled,
  isRequired,
}: UseControllerProps & ConfirmationBoxProps) => {
  const { field } = useController({
    name,
    control,
    rules: {
      required: isRequired,
    },
  });

  return (
    <div className="form-input">
      <Checkbox
        disabled={isDisabled}
        key={field.name}
        styleVariation="default"
        label={label}
        htmlName="confirmSafeguarding-box"
        value="confirmSafeguarding"
        className="confirmation-box"
        checked={field.value}
        {...field}
      />
    </div>
  );
};

export const ConfirmationBox = withTheme(Field);
```



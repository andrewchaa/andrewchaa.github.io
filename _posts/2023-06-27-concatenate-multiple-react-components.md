---
title: Concatenate multiple React components
date: 2023-06-27
tags:
  - react
---

I was working on a custom CheckBox component that displays a label and an error message. The requirement was that the error message should only appear when the input value becomes dirty and is not as expected. Initially, the code looked like this:

```typescript
<CheckBox
  name="confirm"
  control={control}
  label={
    <>
      I confirm that I have followed the <Link href="#procedure"> procedure</Link>
	    <FormInputError id="confirm">
	      Please ensure you have followed the safeguarding procedure before creating this note
	    </FormInputError>
	    </>
  }
  isRequired
/>
```

However, I needed to separate the regular label from the error message to show the message only when necessary. Specifically, I wanted the error message to appear only after the user clicks on the CheckBox, and then  clicks again to untick it.

To achieve this, I had to append `<FormInputError />` component to the existing label. While strings can be easily appended with `+` , it’s not as straightforward with React components. 

I discovered that by using an array `[]` I could achieve the desired result. Here’s an example of how it can be done.

```typescript
const getLabel = () => {
  if (fieldState.isDirty && !field.value) {
    return [label, errorLabel || <></>];
  }

  return [label];
};

return (
  <div className="form-input">
    <CheckboxComp
      disabled={isDisabled}
      key={field.name}
      styleVariation="default"
      label={getLabel()}
      htmlName="confirm-box"
      value="confirm"
      className="confirm-box"
      checked={field.value}
      {...field}
    />
  </div>
);
```

These changes allow the error message to be displayed only when necessary, based on the user’s interaction with the CheckBox. 

Please let me know if you have any further questions.


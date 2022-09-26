---
title: Tips on javascript / typescript development
date: 2022-09-17
tags:
  - tips
  - node.js
---

### update object with spread operator

In React and React Native, the common patter is to map an object to form inputs and update the values of the properties. Spread operator, `...`, comes really handy for the purpose. 

```typescript
<FloatingLabelInput
  isRequired
  label="Customer Address (line1)"
  defaultValue={job.customer.address.line1}
  errorMessage={validation.customerAddress1}
  onChangeText={(customerAddress1: string) => {
    setJob({
      ...job,
      customer: {
        ...job.customer,
        address: {
          ...job.customer.address,
          line1: customerAddress1.trim()
        }
      }
    })
    setValidation({...validation, customerAddress1: ''})
  }}
  autoCapitalize="none"
/>

```

### Kill all node processes

Your old server processor is still running and when you do `yarn stardt` it asks if you want the new server run with a new port number, annoyingly. Kill all the existing node processes.

```bash
ps aux | grep node
killall -9 node
```


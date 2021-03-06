---
title: React Native TextInput
date: 2020-08-23T19:00:45
categories:
  - technical
tags:
  
---


```javascript
import { TextInput } from 'react-native';

<TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    onChangeText={text => onChangeText(text)}
    value={value}
    />
```

The most basic use case is to plop down a `TextInput` and subscribe to the `onChangeText` events to read the user input. 

#### onBlur

The opposite of onFocus. Callback that is called when the text input is blurred. You can get the text value from the event. `e.nativeEvent.text`

```javascript
validatePostCode(postCode) {
  const { update } = this.props

  API.get(installerV2ApiName, `/postcodes/${postCode}`, {
    'headers': { 'x-api-key': 'xxxx' }
  })
  .then(response => {
    update({ postCode: response.Value })
    this.setState({ postCodeError: '' })
  })
  .catch(error => {
    this.setState({ postCodeError: 'The post code is not valid' })
  })
}

...

<TextInput
  title={`Postcode \u{002A}`}
  value={item.postCode}
  onChangeText={postCode => update({postCode})}
  autoCapitalize='characters'
  onBlur={e =>  this.validatePostCode(e.nativeEvent.text)}
  error={this.state.postCodeError}
/>

```


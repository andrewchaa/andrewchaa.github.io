---
title: React Navigation in my code
date: 2020-11-21T23:32:53
categories:
  - technical
tags:
  - react
---

* Create a mother Stack that hosts all other Stacks
* Create AppContainer that contains the stack

```javascript
const ModalStack = createStackNavigator({
    Form: createStackNavigator(
      { New: RegistrationForm },
      { headerMode: 'none', layoutCenter }
      ),
    ScanBarcode: ScanBarcode,
    AddressScreen: AddressScreen
  }, {
    headerMode: 'none',
    mode: 'modal'
  },
);

const RootStack = createBottomTabNavigator({
  Home: createStackNavigator({ Home }, {headerMode: 'none', layoutCenter}),
  MyList: RegistrationStack,
  New: ModalStack,
  News: createStackNavigator({ News }, {headerMode: 'none', layoutCenter}),
  Profile: createStackNavigator({ Profile }, {headerMode: 'none', layoutCenter}),
}, {
     ...
```

I had an error saying "AddressScreen" was not a React component. My mistake. I forgot exporting the component. 

```javascript
// I forgot this.
export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);
```


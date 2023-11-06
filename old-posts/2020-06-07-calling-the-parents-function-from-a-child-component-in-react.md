---
title: Calling the parent's function from a child component in React
date: 2020-06-07T20:09:49
categories:
  - technical
tags:
  
---


To show and hide an element in react is really simple. 

```javascript
{ this.state.dialog && <Dialog /> }
```

One tricky part for me who's relatively react novice, was to control the state value from the child component, &lt;Dialog /&gt;

It turned out simple quite. I pass the parent's function to the child component as prop

```javascript
hideDialog() { this.setState({ dialog: false }) }

render() {
  return (
    { this.state.dialog && <Dialog
        hideDialog={this.hideDialog}
        /> }
  )
}
```

In the child component, I do this, simply

```javascript
const Dialog = ({hideDialog}) => {

  return (
  <div className="modal" tabindex="-1" role="dialog"
    style= {{display: 'block', top: '20%'}}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirmation</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"
            onClick={hideDialog}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
```

Function is no different from any other parameter. You just pass the function as prop.


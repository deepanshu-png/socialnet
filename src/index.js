import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,BrowserRouter} from 'react-router-dom'
import {unregister} from './serviceWorker.js';
import App from './App.js'
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
unregister();

////Without update
//class Clock extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = {date: new Date()};
//  }

//  render() {
//    return (
//      <div>
//        <h1>Hello, world!</h1>
//        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//      </div>
//    );
//  }
//}

//ReactDOM.render(
//  <Clock />,
//  document.getElementById('root')
//);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

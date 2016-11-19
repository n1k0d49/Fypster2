import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <nav className="navbar navbar-default" role="navigation">
  <div className="navbar-header">
    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
  </div>

  <div className="collapse navbar-collapse navbar-ex1-collapse">
    <ul className="nav navbar-nav">
      <li><a href="#">Link</a></li>
      <li><a href="#">Link</a></li>
      <li><a href="#">Link</a></li>
    </ul>
  </div>
  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
      <li><AccountsUIWrapper/></li>
      </ul>
    </div>
</nav>
      <div className="container">
      <form id="search" className="navbar-form navbar-left">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search"/>
        </div>
        &nbsp;
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
      </div>

</div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
};

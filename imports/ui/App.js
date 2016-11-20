import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';

import { People } from '../api/collections.js';

// App component - represents the whole app
class App extends Component {
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
      <li><a href="#">Content</a></li>
      <li><a href="#">People</a></li>
      <li><a href="#">Event</a></li>
      <li><a href="#">Tools</a></li>
    </ul>
  </div>
  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        <li id="sign-up"><AccountsUIWrapper/></li>
      </ul>
    </div>
</nav>
      <div className="container">
      <form id="search-form" className="navbar-form navbar-left">
        <div id="search" className="form-group">
          <input type="text" className="form-control" placeholder="Search"/>
        </div>
      </form>
      </div>
  <div>
  {this.props.people.map((person) => (
      <Person key={person._id} person={person} />
    ))}
  </div>
</div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
  people: PropTypes.array.isRequired,
};

class List extends Component {
  render() {
    let thiscomp = this
    return (
      <div>
        {
          if (thiscomp.props.section=== "content"){
            this.props.results.map((result) =>(
            <Post key={result._id} post={result}/>))
          }
          else if (thiscomp.props.section=== "people"){
            this.props.results.map((result) =>(
            <Person key={result._id} person={result}/>))
          }
          else if (thiscomp.props.section=== "events"){ 
            this.props.results.map((result) =>(
              <Event key={result._id} event={result}/>))
        }
      <div/>
    )
  }
}

class Person extends Component {
  render() {
    return (
      <div>
        {this.props.person.name}
      </div>
    )
  }
}

export default createContainer(() => {
  console.log(People.find({}).fetch());
  return {
    people: People.find({}).fetch()
  };
}, App);

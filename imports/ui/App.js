import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';

import { People, Posts, Events, Tools } from '../api/collections.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {section: "content"};
  }
  makeList() {
    if (this.state.section === "contents") {
      return <List section={this.state.section} results={this.props.posts}/>
    } else if (this.state.section === "people") {
      return <List section={this.state.section} results={this.props.people}/>
    } else if (this.state.section === "events") {
      return <List section={this.state.section} results={this.props.events}/>
    } else if (this.state.section === "tools") {
      return <List section={this.state.section} results={this.props.tools}/>
    }
  }
  render() {
    let thisApp = this;
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
      <li><a onClick={() => {
        thisApp.setState({section: "content"});
      }}>Content</a></li>
      <li><a onClick={() => {
        thisApp.setState({section: "people"});
      }}>People</a></li>
      <li><a onClick={() => {
        thisApp.setState({section: "event"});
      }}>Event</a></li>
      <li><a onClick={() => {
        thisApp.setState({section: "tools"});
      }}>Tools</a></li>
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
    {this.makeList()}
  </div>
</div>
    );
  }
}

// {this.props.people.map((person) => (
//     <Person key={person._id} person={person} />
//   ))}

App.propTypes = {
  currentUser: PropTypes.object,
  people: PropTypes.array.isRequired,
};

class List extends Component {
  renderList() {
    if (thiscomp.props.section=== "content"){
      return this.props.results.map((result) =>(
      <Post key={result._id} post={result}/>))
    }
    else if (thiscomp.props.section=== "people"){
      return this.props.results.map((result) =>(
      <Person key={result._id} person={result}/>))
    }
    else if (thiscomp.props.section=== "events"){
      return this.props.results.map((result) =>(
      <Event key={result._id} event={result}/>))
    }
  }
  render() {
    let thiscomp = this;
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

class Post extends Component {
  render() {
    return (
      <div>
      {this.props.post.title}
      </div>
    )
  }
}

class Event extends Component {
  render() {
    return (
      <div>
      {this.props.post.title}
      </div>
    )
  }
}

class Person extends Component {
  render() {
    return (
      <div className="person-box">
        <p>Name: {this.props.person.name}</p>
        <p>Location: {this.props.person.location}</p>
        <p>Interests: {this.props.person.interests.map(interest=>(<span>{interest}, </span>))}</p>
        <p>Sills: {this.props.person.skills.map(skill=>(<span>{skill}, </span>))}</p>
      </div>
    )
  }
}

export default createContainer(() => {
  People.insert({"name": "I am a pepe", "location": "Not here", "interests": ["Trains", "Turtles"], "skills": ["Javascript", "Html"]});
  People.insert({"name": "Person Peterson", "location": "Thereburg", "interests": ["IA", "AI"], "skills": ["Making clay forge blower", "Computatoinal learning theory"]});

  // console.log(People.find({}).fetch());
  return {
    posts: Posts.find({}).fetch(),
    people: People.find({}).fetch(),
    events: Events.find({}).fetch(),
    tools: Tools.find({}).fetch(),
  };
}, App);

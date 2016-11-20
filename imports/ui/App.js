// Guillermo Valle Perez (c) 2016 (contrib. Nikolai Drouzine)
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';

import { People, Posts, Events, Tools } from '../api/collections.js';
// import { People} from '../api/collections.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {section: "people", posts: this.props.posts};
  }
  componentDidUpdate(prevProps, prevState){
    if (this.props !== prevProps)
      this.setState({posts: this.props.posts})
  }
  makeList() {
    console.log("makeList", this.state.section);
    if (this.state.section === "content") {
      return <List section={this.state.section} results={this.state.posts}/>
    } else if (this.state.section === "people") {
      return <List section={this.state.section} results={this.props.people}/>
    } else if (this.state.section === "events") {
      return <List section={this.state.section} results={this.props.events}/>
    } else if (this.state.section === "tools") {
      return <List section={this.state.section} results={this.props.tools}/>
    }
  }
  handleSearch(){
    let querystring= ReactDOM.findDOMNode(this.refs.search_input).value;
    this.setState({ posts: this.props.posts.filter(x=> x.text.includes(querystring))
    })
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
        thisApp.setState({section: "events"});
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
      <form id="search-form" className="navbar-form navbar-left" onSubmit={this.handleSearch.bind(this)}>
        <div id="search" className="form-group">
          <input type="text" className="form-control" ref= "search_input" placeholder="Search" onChange={this.handleSearch.bind(this)}/>
        </div>
      </form>
      </div>
    <div className="container">
      {this.state.section === "content" ? <NewPost/> : null}
    </div>
  <div className="container">
    {this.makeList()}
  </div>
</div>
    );
  }
}

class NewPost extends Component {
  handleSubmit() {
    Posts._collection.insert({"text": ReactDOM.findDOMNode(this.refs.post).value,
                              "createdAt": new Date(),
                              "owner": Meteor.userId(),
                              "username": Meteor.user().username
                            })
    ReactDOM.findDOMNode(this.refs.post).value="";
  }
  render() {
    return (
      <form id="post-form" className="navbar-form navbar-left" onSubmit={this.handleSubmit.bind(this)}>
        <div id="post" className="form-group">
          <input type="text" ref="post" className="form-control" placeholder="New post"/>
        </div>
      </form>
    )
  }
}

// {this.props.people.map((person) => (
//     <Person key={person._id} person={person} />
//   ))}

App.propTypes = {
  currentUser: PropTypes.object,
  posts: PropTypes.array.isRequired,
  people: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  tools: PropTypes.array.isRequired
};

class List extends Component {
  renderList() {
    console.log(this.props.results);
    let thiscomp = this;
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
      <div className="list-element">
        <p>{this.props.post.username} posted:</p>
        <p>{this.props.post.text}</p>
        <p>at this time {this.props.post.createdAt.parse}</p>
      </div>
    )
  }
}

class Event extends Component {
  render() {
    return (
      <div className="list-element">
      {this.props.event.title}
      </div>
    )
  }
}

class Person extends Component {
  render() {
    return (
      <div className="list-element">
        <p><b>Name</b>: {this.props.person.name}</p>
        <p><b>Location</b>: {this.props.person.location}</p>
        <p><b>Interests</b>: {this.props.person.interests.map((interest,i)=>(<span key={i} >{interest}, </span>))}</p>
        <p><b>Skills</b>: {this.props.person.skills.map((skill,i)=>(<span key={i} >{skill}, </span>))}</p>
      </div>
    )
  }
}


export default createContainer(() => {
  // console.log(People.find({}).fetch());
  return {
    posts: Posts.find({}).fetch(),
    people: People.find({}).fetch(),
    events: Events.find({}).fetch(),
    tools: Tools.find({}).fetch(),
    currentUser: Meteor.user()
  };
}, App);
// Guillermo Valle Perez (c) 2016 (contrib. Nikolai Drouzine)

import { Mongo } from 'meteor/mongo';


export const Posts = new Mongo.Collection('posts');
export const People = new Mongo.Collection('people');
export const Events = new Mongo.Collection('events');
export const Tools = new Mongo.Collection('tools');

People._collection.insert({"name": "Pepe Jimenez", "location": "Not here", "interests": ["Trains", "Turtles"], "skills": ["Javascript", "Html"]});
People._collection.insert({"name": "Person Peterson", "location": "Thereburg", "interests": ["IA", "AI"], "skills": ["Making clay forge blower", "Computatoinal learning theory"]});
// Posts._collection.insert({"title": "This is something", "text": "Lorem ipsum"})
// Events._collection.insert({"title": "Things happening at some place", "text": "Let's all be together and do something for a period of time."})

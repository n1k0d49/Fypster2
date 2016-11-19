import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');
export const People = new Mongo.Collection('people');
export const Events = new Mongo.Collection('events');
export const Tools = new Mongo.Collection('tools');

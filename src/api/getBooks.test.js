import fetchBooks from './getBooks.api.js';
//const request = require('supertest');
//const app = require('../server/app');
//var books = require('./getBooks.api');

var should = require('should');

//const knex = require('../server/config/knex_config');

/*const newUser = {
  first_name: 'me',
  last_name: 'me2',
  email: 'email@email.com',
  pssword: 'pwd123',
};

afterAll(() => {
  knex.destroy();
});*/

describe('GET /books', () => {
  it('should return JSON object of books', (done) => {
    fetchBooks("Pride and Prejudice", "https://www.googleapis.com/books/v1/volumes", (err, data) => {
      console.log('Response: ', data.items[1]);
      //console.log('Error: ', err);
      expect(err).toEqual(null);
      done();
    });
  });
});

describe('GET /books', () => {
  it('should return not-found error due too wrong url', (done) => {
    fetchBooks("Pride and Prejudice", "https://www.googleapis.com/books/v1", (err, data) => {
      expect(err).toEqual('Not Found');
      done();
    });
  });
});

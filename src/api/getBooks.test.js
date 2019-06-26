import fetchBooks from './GetBooks.api.js';

const maxResults = 10;
const startIndex = 0;

describe('Call to fetchBooks', () => {
  it('Should return JSON object of books', (done) => {
    fetchBooks("Pride and Prejudice", "https://www.googleapis.com/books/v1/volumes", maxResults, startIndex, (err, data) => {
      expect(err).toEqual(null);
      expect(data).toBeDefined();
      expect(typeof {data: 'data'}).toBe('object');
      expect(data.items.length).not.toEqual(0);
      expect(data.items[0].volumeInfo.length).not.toEqual(0);
      expect(data.items[0].volumeInfo).toHaveProperty('title');
      done();
    });
  });

  it('Should return data with totalItems =  0, due too a weird query', (done) => {
    fetchBooks("jkhdhsafh oklkjj", "https://www.googleapis.com/books/v1/volumes", maxResults, startIndex, (err, data) => {
      expect(err).toEqual(null);
      expect(data).toBeDefined();
      expect(data.totalItems).toEqual(0);
      done();
    });
  });

  it('Should return Not Found error due too wrong url', (done) => {
    fetchBooks("Pride and Prejudice", "https://www.googleapis.com/books/v1", maxResults, startIndex, (err, data) => {
      expect(err).toEqual('Not Found');
      done();
    });
  });
});
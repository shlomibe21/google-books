import fetchBooks from './GetBooks.api.js';

const maxResults = 10;
const startIndex = 0;

describe('Call to fetchBooks', () => {
  it('Should return JSON object of books', async () => {
    await fetchBooks("Pride and Prejudice", "https://www.googleapis.com/books/v1/volumes", maxResults, startIndex, (err, data) => {
      expect(err).toEqual(null);
      expect(data).toBeDefined();
      expect(typeof { data: 'data' }).toBe('object');
      expect(data.items.length).not.toEqual(0);
      expect(data.items[0].volumeInfo.length).not.toEqual(0);
      expect(data.items[0].volumeInfo).toHaveProperty('title');
    });
  });

  it('Should return a specified number of results', async () => {
    await fetchBooks("Pride and Prejudice", "https://www.googleapis.com/books/v1/volumes", 15, startIndex, (err, data) => {
      expect(err).toEqual(null);
      expect(data).toBeDefined();
      expect(typeof { data: 'data' }).toBe('object');
      expect(data.items.length).toEqual(15);
      expect(data.items[0].volumeInfo.length).not.toEqual(0);
      expect(data.items[0].volumeInfo).toHaveProperty('title');
    });
  });

  it('Should return data with totalItems =  0, due too a weird query', async () => {
    await fetchBooks("jkhdhsafh oklkjj", "https://www.googleapis.com/books/v1/volumes", maxResults, startIndex, (err, data) => {
      expect(err).toEqual(null);
      expect(data).toBeDefined();
      expect(data.totalItems).toEqual(0);
    });
  });

  it('Should return Not Found error due too wrong url', async () => {
    try {
      await fetchBooks("Pride and Prejudice", "https://www.googleapis.com/books/v1", maxResults, startIndex, (err, data) => {
      });
    }
    catch (err) {
      expect(err).toBeDefined();
      expect(err.toString()).toEqual("Error: Not Found");
    }
  });

  it('Should return an error if maxResults is over the allowed value(40)', async () => {
    try {
      await fetchBooks("Pride and Prejudice", "https://www.googleapis.com/books/v1/volumes", 60, startIndex, (err, data) => {
      });
    }
    catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('Should return an error if startIndex is out of range', async () => {
    try {
      await fetchBooks("Pride and Prejudice", "https://www.googleapis.com/books/v1/volumes", maxResults, -1, (err, data) => {
      });
    }
    catch (err) {
      expect(err).toBeDefined();
    }
  });
});
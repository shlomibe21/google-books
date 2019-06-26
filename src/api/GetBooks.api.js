import axios from 'axios';

// google books api calls

// Fetch books based on the searchTerm from google books api
const fetchBooks = async (searchTerm, apiUrl, maxResults, startIndex, callback) => {
    // GET call using axios
    try {
        const result = await axios.get(`${apiUrl}?q=${searchTerm}&maxResults=${maxResults}&startIndex=${startIndex}`);
        // Results
        //console.log('Books Results: ', result.data.items);
        let { data } = result;
        if (callback) {
            callback(null, data);
        }
        return data;
    }
    catch (err) {
        if ((err.response) && (err.response.data)) {
            console.log(err.response.data);
            if (callback) {
                callback(err.response.data);
            }
            return err.response.data;
        }
        else {
            console.log(err);
            if (callback) {
                callback(err);
            }
            return err;
        }
    }
}

export default fetchBooks;
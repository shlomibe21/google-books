import axios from 'axios';

// google books api calls

// Fetch books based on the searchTerm from google books api
const fetchBooks = async (searchTerm, apiUrl, maxResults, startIndex) => {
    // GET call using axios
    try {
        const result = await axios.get(`${apiUrl}?q=${searchTerm}&maxResults=${maxResults}&startIndex=${startIndex}`);
        //console.log('Books Results: ', result.data.items);
        let { data } = result;
        return data;
    }
    catch (err) {
        handleErrors(err);
    }
}

function handleErrors(err) {
    if ((err.response) && (err.response.data)) {
        if ((err.response.data.error) && (err.response.data.error.message)) {
            throw new Error(err.response.data.error.message);
        }
        else {
            throw new Error(err.response.data);
        }
    }
    else {
        throw new Error(err);
    }
}

export default fetchBooks;
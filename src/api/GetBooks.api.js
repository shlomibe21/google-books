import axios from 'axios';

// google books api calls

// Fetch books based on the searchTerm from google books api
const fetchBooks = async (searchTerm, apiUrl, maxResults, startIndex) => {
    // GET call using axios
    try {
        const result = await axios.get(`${apiUrl}?q=${searchTerm}&maxResults=${maxResults}&startIndex=${startIndex}`);
        // Results
        //console.log('Books Results: ', result.data.items);
        let { data } = result;
        return data;
    }
    catch (err) {
        if ((err.response) && (err.response.data)) {
            console.log(err.response.data);
            throw new Error(err.response.data);
        }
        else {
            console.log(err);
            throw new Error(err);
        }
    }
}

export default fetchBooks;
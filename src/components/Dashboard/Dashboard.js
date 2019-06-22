import React, { Component } from 'react';
import BooksList from "../../../src/components/BooksList/BooksList";
import { GOOGLE_BOOKS_API_URL } from '../../config';

import fetchBooks from "../../api/getBooks.api";

import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            query: " "
        };
    }

    search(query) {
        return fetchBooks("Pride and Prejudice and Zombies", GOOGLE_BOOKS_API_URL, this.getFetchedResults);
    }

    getFetchedResults = (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            this.setState({ books: data });
        }
    };

    render() {
        // Get the books list
        let { books } = this.state;
        let booksList = null;
        if (books) {
            booksList = <BooksList books={books} />
        }
        return (
            <div>
                <header>
                    <h1>Welcome to SBS Books</h1>
                </header>
                <button
                    className="search-button"
                    onClick={(evt) => this.search(evt)}>
                    Search
                </button>
                {booksList}
            </div>
        );
    }
}

export default Dashboard;
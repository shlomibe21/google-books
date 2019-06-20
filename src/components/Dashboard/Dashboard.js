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
        };
    }

    search(query) {
        return fetchBooks("Pride and Prejudice and Zombies", GOOGLE_BOOKS_API_URL, this.getFetchResults);
    }

    getFetchResults = (err, data) => {
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
        return (
            <div>
                <h1>Welcome to SBS Books</h1>
                <button className="form-btn" onClick={(evt) => this.search(evt)}>
                    Search
                </button>
                <BooksList books={books} />
            </div>
        );
    }
}

export default Dashboard;
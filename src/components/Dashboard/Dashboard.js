import React, { Component } from 'react';
import BooksList from '../../../src/components/BooksList/BooksList';
import { GOOGLE_BOOKS_API_URL, defaultMaxResults, defaulStartIndex } from '../../config';

import fetchBooks from '../../api/GetBooks.api';
import SearchInput from '../Search/Search';
import Loader from '../UI/Loader/Loader';

import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchQuery: '',
            loading: false
        };
    }

    componentDidMount() {
        // We are starting with empty searc box so we don't need this one at this point
        //return fetchBooks(this.state.searchQuery, GOOGLE_BOOKS_API_URL, defaultMaxResults, defaulStartIndex, this.getFetchedResults);
    }

    search() {
        // If search box is not empty perform fetch books - perform GET request from google books api
        if (this.state.searchQuery.length > 0) {
            this.handleLoadingState(true);
            return fetchBooks(this.state.searchQuery, GOOGLE_BOOKS_API_URL, defaultMaxResults, defaulStartIndex, this.getFetchedResults);
        }
        // In case that search box is empty, change books state to empty array.
        else {
            this.setState({ books: [] });
        }
    }

    // Callback function to handle the results of fetchBooks
    getFetchedResults = (err, data) => {
        this.handleLoadingState(false);
        if (err) {
            console.log(err);
        }
        else {
            //console.log('Books Data: ', data);
            this.setState({ books: data });
        }
    };

    handleLoadingState(state) {
        this.setState({ loading: state });
    }

    updateQueryValue(evt) {
        this.setState({ searchQuery: evt.target.value });
        // Due to limited search rate, don't search on the fly,
        // search only when the search button is clicked
        //this.search();
    }

    handleSearchInputonKeyDown(evt) {
        // If Enter button was pressed, call to search
        if(evt.keyCode === 13){
            this.search();
         }
    }

    render() {
        // Get the books list
        let { books } = this.state;
        let booksList = null;
        if (books) {
            booksList = <BooksList books={books} />
        }
        if (this.state.loading) {
            return <Loader />
        }
        return (
            <div className="dashboard centered-container centered-text" aria-live="polite">
                <header>
                    <h1>Welcome to SBS Books</h1>
                </header>
                <SearchInput
                    searchQuery={this.state.searchQuery}
                    onSearchInputChange={evt => this.updateQueryValue(evt)}
                    onSearchButtonClick={() => this.search()}
                    onSearchInputKeyDown={(evt) => this.handleSearchInputonKeyDown(evt)}
                />
                {booksList}
            </div>
        );
    }
}

export default Dashboard;
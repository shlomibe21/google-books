import React, { Component } from 'react';
import BooksList from '../../../src/components/BooksList/BooksList';
import { GOOGLE_BOOKS_API_URL, defaultMaxResults, defaulStartIndex } from '../../config';
//import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';

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
            loading: false,
            currentStartIndex: 0,
            prevStartIndex: 0,
            searchQueryChanged: true
        };
    }

    componentDidMount() {
        // We are starting with empty searc box so we don't need this one at this point
        //return fetchBooks(this.state.searchQuery, GOOGLE_BOOKS_API_URL, defaultMaxResults, defaulStartIndex, this.getFetchedResults);
    }

    search(maxResults, StartIndex) {
        // If search box is not empty perform fetch books - perform GET request from google books api
        if (this.state.searchQuery.length > 0) {
            this.handleLoadingState(true);
            return fetchBooks(this.state.searchQuery, GOOGLE_BOOKS_API_URL, maxResults, StartIndex, this.getFetchedResults);
        }
        // In case that search box is empty, change books state to empty array.
        else {
            this.setState({ books: [] });
        }
    }

    // Callback function to handle the results of fetchBooks
    getFetchedResults = (err, data) => {
        this.handleLoadingState(false);
        this.setState({ searchQueryChanged: false });
        if (err) {
            // If fetch failed we need to set currentStartIndex to what it was before
            this.setState({ currentStartIndex: this.state.prevStartIndex });
            console.log(err);
            alert('Error: please try again. \nYou may need to wait a few minutes!');
        }
        else {
            // If fetch was ok we need to set prevStartIndex to the same value as currentStartIndex
            this.setState({ prevStartIndex: this.state.currentStartIndex});
            //console.log('Books Data: ', data);
            this.setState({ books: data });
        }
    };

    handleLoadingState(state) {
        this.setState({ loading: state });
    }

    updateQueryValue(evt) {
        this.setState({ searchQuery: evt.target.value });
        this.setState({ searchQueryChanged: true });
        // Due to limited search rate, don't search on the fly,
        // search only when the search button is clicked
        //this.search(defaultMaxResults, defaulStartIndex);
    }

    handleOnClickSearchButton() {
        // This is a new search
        this.search(defaultMaxResults, defaulStartIndex);
        // Reset currentStartIndex
        this.setState({ currentStartIndex: defaulStartIndex });
    }

    handleSearchInputonKeyDown(evt) {
        // If Enter button was pressed, call to search
        if (evt.keyCode === 13) {
            this.search(defaultMaxResults, defaulStartIndex);
            // This is a new search, reset currentStartIndex
            this.setState({ currentStartIndex: defaulStartIndex });
        }
    }

    handleSearchNextItems(evt) {
        // Increment currentStartIndex by number of maxResults
        this.setState({ currentStartIndex: this.state.currentStartIndex + defaultMaxResults });
        this.search(defaultMaxResults, this.state.currentStartIndex);
    }

    handleSearchPrevItems(evt) {
        // Decrement currentStartIndex by number of maxResults
        this.setState({ currentStartIndex: this.state.currentStartIndex - defaultMaxResults });
        this.search(defaultMaxResults, this.state.currentStartIndex);
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

        // Set the conditions to display or to hide the next and prev buttons
        let nextItemsButtonHidden = ((books.length === 0) ||
            (this.state.currentStartIndex >= books.totalItems) ||
            (this.state.searchQueryChanged));
        let prevItemsButtonHidden = ((this.state.currentStartIndex <= 0) ||
            (this.state.searchQueryChanged));

        return (
            <div className="dashboard centered-container centered-text" aria-live="polite">
                <header>
                    <h1>Welcome to SBS Books</h1>
                </header>
                <SearchInput
                    searchQuery={this.state.searchQuery}
                    onSearchInputChange={evt => this.updateQueryValue(evt)}
                    onSearchButtonClick={() => this.handleOnClickSearchButton()}
                    onSearchInputKeyDown={(evt) => this.handleSearchInputonKeyDown(evt)}
                />
                {prevItemsButtonHidden ? <span></span> : <button className="prevItemsButton" onClick={(evt) => this.handleSearchPrevItems(evt)}>Prev</button>}
                {nextItemsButtonHidden ? <span></span> : <button className="nextItemsButton" onClick={(evt) => this.handleSearchNextItems(evt)}>Next</button>}
                {booksList}
            </div>
        );
    }
}

export default Dashboard;
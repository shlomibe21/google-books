import React, { Component } from 'react';
import BooksList from '../../../src/components/BooksList/BooksList';
import { GOOGLE_BOOKS_API_URL, defaultMaxResults, defaulStartIndex } from '../../config';
//import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';

import fetchBooks from '../../api/GetBooks.api';
import SearchInput from '../Search/Search';
import Loader from '../UI/Loader/Loader';
import ErrorMessage from '../ErrorMessages/ErrorMessages';

import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            errors: '',
            searchQuery: '',
            loading: false,
            currentStartIndex: 0,
            prevStartIndex: 0,
            searchQueryChanged: false
        };
    }

    componentDidMount() {
        // We are starting with empty searc box so we don't need this one at this point
        //return fetchBooks(this.state.searchQuery, GOOGLE_BOOKS_API_URL, defaultMaxResults, defaulStartIndex, this.getFetchedResults);
    }

    // Implement search based on the search query in the search box
    search = async (maxResults, StartIndex) => {
        this.setState({ searchQueryChanged: false });
        // If search box is not empty perform fetch books - perform GET request from google books api
        if (this.state.searchQuery.length > 0) {
            this.handleLoadingState(true);
            try {
                const books = await fetchBooks(this.state.searchQuery, GOOGLE_BOOKS_API_URL, maxResults, StartIndex, this.getFetchedResults);
                this.fetchResultsSuccess(books);
            }
            catch (err) {
                this.fetchResultsFailure(err);
            }
            finally {
                this.handleLoadingState(false);
            }
        }
        // In case that search box is empty, change books state to empty array.
        else {
            this.setState({ books: [] });
        }
    }

    // Handle results in case that fetch was successful
    fetchResultsSuccess(data) {
        // If fetch was successful we need to set prevStartIndex to the same value as currentStartIndex
        this.setState({ prevStartIndex: this.state.currentStartIndex });
        // Clear errors
        this.setState({ errors: '' });
        // Update books
        this.setState({ books: data });
    }

    // Handle errors in case that fetch failed
    fetchResultsFailure(err) {
        console.log(err);
        // If fetch failed we need to set currentStartIndex to what it was before
        this.setState({ currentStartIndex: this.state.prevStartIndex });
        this.setState({ errors: err.message });
    }

    handleLoadingState(state) {
        this.setState({ loading: state });
    }

    updateQueryValue(evt) {
        this.setState({ searchQuery: evt.target.value });
        this.setState({ searchQueryChanged: true });
        this.setState({ errors: '' });
        // Due to limited search rate, don't search on the fly,
        // search only when the search button is clicked
        //this.search(defaultMaxResults, defaulStartIndex);
    }

    handleNewSearch() {
        this.search(defaultMaxResults, defaulStartIndex);
        // This is a new search, reset currentStartIndex
        this.setState({ currentStartIndex: defaulStartIndex });
    }

    handleOnClickSearchButton() {
        // This is a new search
        this.handleNewSearch();
    }

    handleSearchInputonKeyDown(evt) {
        // If Enter button was pressed, call to search
        if (evt.keyCode === 13) {
            // This is a new search
            this.handleNewSearch()
        }
    }

    handleSearchNextItems = async (evt) => {
        // Increment currentStartIndex by number of maxResults
        await this.setState(prevState => ({
            currentStartIndex: (prevState.currentStartIndex + defaultMaxResults)
        }));
        this.search(defaultMaxResults, this.state.currentStartIndex);
    }

    handleSearchPrevItems = async (evt) => {
        // Decrement currentStartIndex by number of maxResults
        await this.setState(prevState => ({
            currentStartIndex: (prevState.currentStartIndex - defaultMaxResults)
        }));
        this.search(defaultMaxResults, this.state.currentStartIndex);
    }

    render() {
        // Get the books list
        let { books } = this.state;
        let booksList = null;
        let loader = null;

        if (books) {
            booksList = <BooksList books={books} />
        }
        if (this.state.loading) {
            loader = <Loader />;
        }

        // Set the conditions to display or to hide the next and prev buttons
        let nextItemsButtonHidden = ((books.length === 0) ||
            ((this.state.currentStartIndex + defaultMaxResults) >= books.totalItems) ||
            (this.state.searchQueryChanged));
        let prevItemsButtonHidden = (((this.state.currentStartIndex - defaultMaxResults) < 0) ||
            (this.state.searchQueryChanged));

        return (
            <div className="dashboard centered-container centered-text" aria-live="polite">
                {loader}
                <header>
                    <h1>Welcome to SBS Books</h1>
                </header>
                <ErrorMessage error={this.state.errors} />
                <SearchInput
                    searchQuery={this.state.searchQuery}
                    onSearchInputChange={evt => this.updateQueryValue(evt)}
                    onSearchButtonClick={() => this.handleOnClickSearchButton()}
                    onSearchInputKeyDown={(evt) => this.handleSearchInputonKeyDown(evt)}
                />
                {prevItemsButtonHidden ? <span></span> : <button className="prev-items-button" onClick={(evt) => this.handleSearchPrevItems(evt)}>Prev</button>}
                {nextItemsButtonHidden ? <span></span> : <button className="next-items-button" onClick={(evt) => this.handleSearchNextItems(evt)}>Next</button>}
                {booksList}
            </div>
        );
    }
}

export default Dashboard;
import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';


import './Search.css';

class SearchInput extends Component {
    render() {
        return (
            <div className="search-wrapper">
                <input 
                    type="text"
                    className="search-books-input"
                    aria-label="Search books input"
                    placeholder="Search books"
                    value={this.props.searchQuery}
                    onChange={(evt) => this.props.onSearchInputChange(evt)}
                    onKeyDown={(evt) => this.props.onSearchInputKeyDown(evt)}
                />
                <button type="submit" className="search-books-button"
                    aria-label="Search books button"
                    onClick={(evt) => this.props.onSearchButtonClick(evt)}>
                    <FaSearch />
                </button>
            </div>
        );
    }
}

export default SearchInput;
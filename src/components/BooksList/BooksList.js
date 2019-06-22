import React from 'react';
import BookTile from '../BookTile/BookTile';
import './BooksList.css';

function BooksList(props) {
    //console.log(props.books);
    let booksList = null;
    if (props.books && props.books.items) {
        booksList = props.books.items.map((book, index) => (
            <li key={index} className="">
                <BookTile index={index} {...book} />
            </li>
        ));
    }
    else {
        booksList = <title className="books-list-title">Empty</title>
    }
    return (
        <section className="books-container">
            <legend>Books List</legend>
            <ul className="books-list">{booksList}</ul>
        </section>
    );
}

export default BooksList;
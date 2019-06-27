import React from 'react';
import BookTile from '../BookTile/BookTile';
import './BooksList.css';

function BooksList(props) {
    //console.log(props.books);
    let booksList = null;
    let totalItems = null;
    let template = null;

    if (props.books && props.books.items) {
        totalItems = <span>{props.books.totalItems} items found</span>;
        booksList = getBooksList();
        template = <ul className="books-list">{booksList}</ul>;

        function getBooksList() {
            return props.books.items.map((book, index) => (
                <li key={index} className="">
                    <BookTile index={index} {...book} />
                </li>
            ));
        }
    }
    else {
        // Display an empty page message
        totalItems = null;
        template = <div className="emapty-page-msg centered-container">
            <p>Hey, It is empty in here! Let's find some good books to read.</p>
            <img
                src={require("../../images/woman-1459220_1280.png")}
                alt="Empty page"
            />
        </div>
    }
    return (
        <section className="books-container">
            <legend >Books List</legend>
            {totalItems}
            {template}
        </section>
    );
}

export default BooksList;
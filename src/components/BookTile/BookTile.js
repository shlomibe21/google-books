import React from 'react';

function BookTile(props) {
    let bookTile = null;

    if (props.volumeInfo) {
        let image = getImage(props.volumeInfo);
        let authors = getAuthors(props.volumeInfo);

        function getImage(volumeInfo) {
            let thumbnail = null;
            let title = null;
            if((volumeInfo.imageLinks) && (volumeInfo.imageLinks.thumbnail)) {
                thumbnail = volumeInfo.imageLinks.thumbnail;
            }
            if(volumeInfo.title) {
                title = volumeInfo.title;
            }
            return <img
                alt={`${title}`}
                src={`${thumbnail}`}
            />
        }

        // Create a readable authors list - names are sperated by comma
        function getAuthors(volumeInfo) {
            // Check if authors exist
            if (!volumeInfo.authors) {
                // No authors for this volume, return an empty list
                return <span></span>
            }
            // At least one author found, build the list
            let authorsList = volumeInfo.authors;
            return authorsList.map((author, index) => {
                // Insert a comma between authors
                return <span key={index}>{author}{index + 1 < authorsList.length ? ', ' : ''} </span>
            });
        }

        bookTile = 
        <div className="book-tile">
            {image}
            <p>{props.volumeInfo.title}</p>
            <p>{authors}</p>
            <p>{props.volumeInfo.publisher}</p>
        </div>
    }
    return (
        <div>
            <title className="book-title">Book</title>
            {bookTile}
        </div>
    );
}

export default BookTile;
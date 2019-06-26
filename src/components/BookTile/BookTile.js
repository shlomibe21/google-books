import React from 'react';

import Tooltip from "../Utils/ToolTip";

import './BookTile.css';

function BookTile(props) {
    let bookTile = null;

    if (props.volumeInfo) {
        // Build the book's tile
        let bookTitleTemplate = getBookTitle(props.volumeInfo);
        let authorsTemplate = getAuthors(props.volumeInfo);
        let publisherTemplate = getPublisher(props.volumeInfo);
        let thumbnailTemplate = getThumbnail(props.volumeInfo);

        function getBookTitle(volumeInfo) {
            // Link to external page to display more info about the current book
            let infoLink = volumeInfo.infoLink;

            // Check if title exists
            if (!volumeInfo.title) {
                // No title for this volume, return an empty list
                return <div></div>
            }
            // Build the title's template with the external link
            return <a className="book-title-link" href={infoLink} target="_blank" rel="noopener noreferrer">
                <Tooltip message={volumeInfo.title} position={"top"}>
                    <div className="book-title book-info">{volumeInfo.title}</div>
                </Tooltip>
            </a>;
        }

        // Create a readable authors list - names are sperated by comma
        function getAuthors(volumeInfo) {
            // Check if authors exists
            if (!volumeInfo.authors) {
                // No authors for this volume, return an empty list
                return <div></div>
            }
            // At least one author found, build the list
            let authorsList = volumeInfo.authors;
            return authorsList.map((author, index) => {
                // Insert a comma between authors
                return <span key={index}>{author}{index + 1 < authorsList.length ? ', ' : ''} </span>
            });
        }

        function getPublisher(volumeInfo) {
            // Build the publisher's template
            return <div className="book-publisher book-info">{props.volumeInfo.publisher}</div>;
        }

        function getThumbnail(volumeInfo) {
            // Link to external page to display more info about the current book
            let infoLink = volumeInfo.infoLink;
            let img = null;
            let title = null;
            if ((volumeInfo.imageLinks) && (volumeInfo.imageLinks.thumbnail)) {
                img = volumeInfo.imageLinks.thumbnail;
            }
            if (volumeInfo.title) {
                title = volumeInfo.title;
            }
            return <a href={infoLink} target="_blank" rel="noopener noreferrer">
                <img
                    alt={`${title}`}
                    src={`${img}`}
                />
            </a>;
        }

        bookTile =
            <div className="book-tile-container">
                <div className="thumbnail-container">
                    <div className="thumbnail">
                        <div className="">{thumbnailTemplate}</div>
                    </div>
                </div>
                <div className="book-title-wrapper">{bookTitleTemplate}</div>
                <div>
                <Tooltip message={authorsTemplate} position={"right"}>
                    <div className="book-authors book-info">{authorsTemplate}</div>
                </Tooltip>
                </div>
                <div>
                <Tooltip message={publisherTemplate} position={"bottom"}>
                    {publisherTemplate}
                </Tooltip>
                </div>
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
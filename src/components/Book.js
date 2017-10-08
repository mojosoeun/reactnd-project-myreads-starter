import React from 'react'
import PropTypes from 'prop-types'


const Book = props => {

    const { book, changeShelf } = props;
    const thumbnail = book.imageLinks ? book.imageLinks.smallThumbnail : '';

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{backgroundImage: `url(${thumbnail})`}}></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => changeShelf(book, e.target.value)} value={book.shelf}>
                        <option value="" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
    )
}

Book.propTypes = {
    changeShelf: PropTypes.func.isRequired
}

export default Book;

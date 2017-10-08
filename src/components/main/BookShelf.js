import React from 'react'
import PropTypes from 'prop-types'
import Book from '../Book'

const BookShelf = props => {
    const { books, changeShelf } = props

    return (
        <div className="bookshelf">
            {
                Object.keys(books).map((shelf, index) => (
                    <div key={index}>
                        <h2 className="bookshelf-title">{shelf}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    books[shelf].map((book) => {
                                        return (
                                            <li key={book.id}>
                                                <Book book={book} changeShelf={changeShelf}/>
                                            </li>
                                        )
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                ))}
        </div>
    )
}

BookShelf.propTypes = {
    books: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default BookShelf;
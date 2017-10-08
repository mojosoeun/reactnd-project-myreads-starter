import React from 'react'
import BookShelf from './BookShelf'
import SearchButton from './SearchButton'
import PropTypes from 'prop-types'


const ListBooks = props => {
    const { books, changeShelf, clear } = props
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf books={books} changeShelf={changeShelf}/>
            </div>
            <SearchButton clear={clear}/>
        </div>
    )
}

ListBooks.propTypes = {
    books: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default ListBooks;
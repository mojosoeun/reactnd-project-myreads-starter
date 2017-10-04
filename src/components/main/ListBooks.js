import React, { Component } from 'react'
import BookShelf from './BookShelf'
import SearchButton from './SearchButton'
import PropTypes from 'prop-types'



class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

    render() {
        const { books, changeShelf } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf books={books} changeShelf={changeShelf}/>
                </div>
                <SearchButton/>
            </div>
        )
    }
}

export default ListBooks;
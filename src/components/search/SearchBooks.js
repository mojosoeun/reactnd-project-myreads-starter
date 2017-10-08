import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Book from '../Book'
import PropTypes from 'prop-types'
import * as BooksAPI from '../../BooksAPI'

class SearchBooks extends Component {

    state = {
        searchBooks: [],
    }

    searchBook = (query, maxResults) => {
        BooksAPI.search(query, maxResults)
            .then((searchBooks) => {
                if (Array.isArray(searchBooks)) {
                    let books = this.props.books;
                    searchBooks.map((book) => {
                        let bookOnShelf = books.find((b) => b.id === book.id);
                        if (bookOnShelf) {
                            book.shelf = bookOnShelf.shelf;
                        } else {
                            book.shelf = 'none';
                        }
                        return book;
                    })
                    this.setState({ searchBooks });
                } else {
                    this.setState({ searchBooks: [] })
                }
            })
            .catch((e)=>{this.setState({searchBooks: []})})
    }
    render(){
        return (
            <div className="search-books">
                <SearchBar searchBook={this.searchBook}/>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.searchBooks.map((book) => {
                                return (
                                    <li key={book.id}>
                                        <Book book={book} changeShelf={this.props.changeShelf}/>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }

}

SearchBooks.propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
}

export default SearchBooks;

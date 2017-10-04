import React, {Component} from 'react'
import SearchBar from './SearchBar'
import Book from '../Book'
import PropTypes from 'prop-types'


class SearchBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired,
        searchBook: PropTypes.func.isRequired
    }

    render() {
        const { books, searchBook, changeShelf } = this.props;

        return (
            <div className="search-books">
                <SearchBar searchBook={searchBook} />
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books.map((book) => {
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
        )
    }
}

export default SearchBooks;

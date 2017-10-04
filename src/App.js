import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/main/ListBooks'
import SearchBooks from './components/search/SearchBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {

    state = {
        myBooks: {},
        searchBooks: []

    }

    componentDidMount() {
        this.getAllBook()
    }

    getAllBook = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({ myBooks : books.groupBy('shelf') })
        })
    }

    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
        this.getAllBook();
    }

    searchBook = (query, maxResults) => {
        BooksAPI.search(query, maxResults).then((searchBooks) => {
            if (Array.isArray(searchBooks)) {
                this.setState({ searchBooks })
            } else {
                this.setState({ searchBooks: [] })
            }
        })
    }

    getBookInfo = (bookId) => {
        BooksAPI.get(bookId).then((book) => {

        })
    }


    render() {
        return (
          <div className="app">
              <Route exact path='/' render={() => (
                  <ListBooks books={this.state.myBooks} changeShelf={this.changeShelf}/>
              )}/>
              <Route exact path='/search' render={() => (
                  <SearchBooks books={this.state.searchBooks} searchBook={this.searchBook} changeShelf={this.changeShelf}/>
              )}/>
          </div>
        )
    }
}

Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
        var val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
}

export default BooksApp

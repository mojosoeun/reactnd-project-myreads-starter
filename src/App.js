import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/main/ListBooks'
import SearchBooks from './components/search/SearchBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {

    state = {
        searchBooks: [],
        myBooks: {
            currentlyReading: [],
            wantToRead: [],
            read: [],
        },
        books: []
    }

    componentDidMount() {
        this.getAllBook()
    }

    getAllBook = () => {
        BooksAPI.getAll().then((books) => {
            const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
            const wantToRead = books.filter((book) => book.shelf === 'wantToRead')
            const read = books.filter((book) => book.shelf === 'read')
            this.setState({ myBooks: {currentlyReading, wantToRead, read}, books})
        })
    }

    changeShelf = (book, shelf) => {

        BooksAPI.update(book, shelf).then((result) => {
            const sourceShelf = book.shelf;
            const targetShelf = shelf;
            const copyBooks = this.state.myBooks;

            if (targetShelf !== 'none') {
                const source = this.state.myBooks[sourceShelf]

                if (source) {
                    source.splice(source.indexOf(book), 1)
                    Object.assign(copyBooks, {[sourceShelf]: source})

                }

                const target = this.state.myBooks[targetShelf]

                if (target) {
                    target.push(book)
                    Object.assign(copyBooks, {[targetShelf]: target})

                }

                book.shelf = shelf
            }

            this.setState({ myBooks: copyBooks })


        });
    }

    render() {
        return (
          <div className="app">
              <Route exact path='/' render={() => (
                  <ListBooks
                      books={this.state.myBooks}
                      changeShelf={this.changeShelf}
                  />
              )}/>
              <Route exact path='/search' render={() => (
                  <SearchBooks
                      books={this.state.books}
                      changeShelf={this.changeShelf}
                  />
              )}/>
          </div>
        )
    }
}

export default BooksApp

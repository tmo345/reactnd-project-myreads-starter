import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';
import MyReads from './MyReads';
import Search from './Search';


export default class BooksApp extends React.Component {
  state ={
    myBooks: []
  };

  /**
   * Bookshelf categories for use as headings and options in bookshelf changer dropdown menus.
   */
  shelves = [
    'Currently Reading',
    'Want to Read',
    'Read'
  ];

  /**
   * @description React lifecycle hook componentDidMount
   * Ajax call to BooksAPI for all books and then set myBooks state on resolution of
   * promise
   */
  componentDidMount = () => {
    BooksAPI.getAll()
      .then(
        (myBooks) => {
          this.setState({ myBooks });
        },
        (err) => {
          // TODO: Error handling
          console.log(err.message);
        });
  };

  /**
   * @description Ajax call to BooksAPI to update the shelf of a book when a new shelf is selected
   * for that book. On fulfillment of returned promise, the myBooks state is set to a duplicate
   * array of Books with the updated book and shelf.
   * @param {Book}   bookToChange
   * @param {string} shelf
   */
  shelfChangeHandler = (bookToChange, shelf) => {
    BooksAPI.update(bookToChange, shelf)
      .then(() => {
        let newMyBooks = this.changeBookshelf(bookToChange, shelf);
        this.updateMyBooks(newMyBooks);
      }, (err) => {
        // TODO: Error handling
        console.log(err.message);
      });
  };

  /**
   * @description Maps over current myBooks state and returns a new myBooks array with the
   * bookToChange updated to the newShelf.
   * Citation: Fullstack React: The Complete Guide for ReactJS and Friends
   *           Accomazzo et. al. Page 50.
   * Read about and modeled code for how to map over an array of objects and return a
   * duplicate array with one modified object that has been created using Object.assign. Since
   * inital use of technique, variants of this have been used in several places in code base.
   * @param   {Book}   booktoChange
   * @param   {string} newShelf
   * @returns {Book[]}
   */
  changeBookshelf = (bookToChange, newShelf) => {
    return this.state.myBooks.map((myBook) => {
      if (bookToChange.id === myBook.id) {
        return Object.assign({}, myBook, { shelf: newShelf }) ;
      } else {
        return myBook;
      }
    })
  };

  /**
   * @description Sets myBooks state
   * @param {Book[]} newMyBooks
   */
  updateMyBooks = (newMyBooks) => {
    this.setState({
      myBooks: newMyBooks
    });
  };

  /**
   * @description Render app routes.
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyReads
            shelves={this.shelves}
            myBooks={this.state.myBooks}
            shelfChangeHandler={this.shelfChangeHandler}
          />
          )}/>
        <Route path="/search" render={({history}) => (
          <Search
            shelves={this.shelves}
            myBooks={this.state.myBooks}
            shelfChangeHandler={this.shelfChangeHandler}
            closeSearchHandler={(history) => history.push('/')}
          />
          )}/>
      </div>
    );
  };
}

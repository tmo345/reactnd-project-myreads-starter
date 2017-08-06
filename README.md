# React Fundamentals course final assessment project
## Udacity React Nanodegree
My Reads app built with React using the provided [starter template](https://github.com/udacity/reactnd-project-myreads-starter), [create-react-app](https://github.com/facebookincubator/create-react-app), and [BooksAPI](./src/BooksAPI.js).

The app has two main views, a main page with the user's library of books represented in bookshelves and a search page where the user can search for new books to add to the library on the main page. Users can move books between shelves on the main page and add new books to their shelves from the search page.
### Installation
See [PROJECT_INSTRUCTIONS](./PROJECT_INSTRUCTIONS.md) for original README with directions for completing project.

Clone repository:
```
$ git clone https://github.com/tmo345/reactnd-project-myreads-starter
```
Run npm install from project root:
```
$ npm install
```
Run npm start to start the development server:
```
$ npm start
```
The app should automatically launch in a new tab in your default browser or it can be found by default at [localhost:3000](http://localhost:3000).

### Tips
- If you wish to use another port besides the react-scripts default 3000, for the app, edit [package.json](./package.json) scripts and add a PORT env variable to the "start" script. Note: this works for Mac and Linux. 
  - Source: [riceyeh](https://github.com/riceyeh)'s answer to create-react-app [#1083](https://github.com/facebookincubator/create-react-app/issues/1083).
```json
"scripts": {
  "start": "PORT=YOUR_PORT_HERE react-scripts start",
  ...
}
```

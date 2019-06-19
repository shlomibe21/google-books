import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BooksList from "./components/BooksList/BooksList"
import './App.css';

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header>

          </header>
          <main>
            <Switch>
              <Route exact path="/" component={BooksList} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

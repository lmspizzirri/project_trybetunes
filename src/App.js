import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import Album from './components/Album';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          path="/search"
          component={ Search }
        />
        <Route
          path="/album/:id"
          component={ Album }
        />
        <Route
          path="/favorites"
          component={ Favorites }
        />
        <Route
          exact
          path="/profile"
          component={ Profile }
        />
        <Route
          path="/profile/edit"
          component={ ProfileEdit }
        />
        <Route
          path=""
          component={ NotFound }
        />
      </Switch>
    );
  }
}

export default App;

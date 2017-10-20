import React from 'react';
import { Provider } from 'react-redux';
import { shape, string } from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import store from './store';
import Timers from './containers/Timers';
import ThemeProvider from './containers/ThemeProvider';
import LoadApp from './containers/LoadApp';
import AppUpdater from './components/AppUpdater';

require('typeface-roboto');

const ELECTRON_PATHNAME = '/electron';

const App = ({ location }) => (
  <Provider store={store}>
    <ThemeProvider>
      <Timers />
      <LoadApp />
      {location.pathname === ELECTRON_PATHNAME && <AppUpdater />}
    </ThemeProvider>
  </Provider>
);

App.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
};

const BaseRoute = () => (
  <Router>
    <Route path="/" component={App} />
  </Router>
);

export default BaseRoute;

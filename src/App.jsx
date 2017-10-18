import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Timers from './containers/Timers';
import ThemeProvider from './containers/ThemeProvider';

require('typeface-roboto');

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <Timers />
    </ThemeProvider>
  </Provider>
);

export default App;

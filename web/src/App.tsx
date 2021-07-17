import React from 'react';
import store from './redux/store';
import { SnackbarProvider } from 'notistack';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Routes
import { LoginPage, ProfilePage } from './pages/index';
import { PublicRoute, PrivateRoute } from 'utils';

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Switch>
              {/* Public Routes */}
              <PublicRoute path="/login" component={LoginPage} exact />

              {/* Private Routes */}
              <PrivateRoute path="/" component={ProfilePage} exact />

              <Route path="/" render={() => <div>NOT FOUND</div>} />
            </Switch>
          </Router>
        </SnackbarProvider>
      </Provider>
    </>
  );
};

export default App;

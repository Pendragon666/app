import React from 'react';
import store from './redux/store';
import { SnackbarProvider } from 'notistack';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Routes
import { LoginPage, ProfilePage, RegisterPage, TournamentPage } from './pages/index';
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
              <PublicRoute path="/register" component={RegisterPage} exact />

              {/* Private Routes */}
              <PrivateRoute path="/" component={ProfilePage} exact />
              <PrivateRoute path="/tournaments" component={TournamentPage} exact />

              <Route path="/" render={() => <div>NOT FOUND</div>} />
            </Switch>
          </Router>
        </SnackbarProvider>
      </Provider>
    </>
  );
};

export default App;

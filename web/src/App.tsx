import React from 'react';
import { SnackbarProvider } from 'notistack';

import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Routes
import { HomePage, LoginPage, ProfilePage, RegisterPage, StatsPage, TournamentPage } from 'pages';
import { PublicRoute, PrivateRoute } from 'uikits';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { clearMessage } from 'redux/actions/uiActions';

const App: React.FC = () => {
  const UI = useSelector((state: any) => state.UI);
  const dispatch = useDispatch();
  const ClearMessage = () => dispatch(clearMessage());

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Switch>
            {/* Public Routes */}
            <PublicRoute path="/login" component={LoginPage} exact />
            <PublicRoute path="/register" component={RegisterPage} exact />

            {/* Private Routes */}
            <PrivateRoute path="/" component={HomePage} exact />
            <PrivateRoute path="/stats" component={StatsPage} exact />
            <PrivateRoute path="/profile" component={ProfilePage} exact />
            <PrivateRoute path="/tournaments" component={TournamentPage} exact />

            <Route path="/" render={() => <div>NOT FOUND</div>} />
          </Switch>
        </Router>
        <Snackbar
          open={UI.show}
          autoHideDuration={2500}
          onClose={() => ClearMessage()}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Alert onClose={() => ClearMessage()} severity={UI.type}>
            {UI.message}
          </Alert>
        </Snackbar>
      </SnackbarProvider>
    </>
  );
};

export default App;

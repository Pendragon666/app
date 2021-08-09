import React, { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';

import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Routes
import { HomePage, LoginPage, ProfilePage, RegisterPage, StatsPage, TournamentPage, SingleTournamentPage } from 'pages';
import { PublicRoute, PrivateRoute } from 'uikits';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { clearMessage } from 'redux/actions/uiActions';
import { Workbox } from 'workbox-window';

const App: React.FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('/sw.js');

      wb.addEventListener('installed', (event) => {
        event.sw?.addEventListener('statechange', () => {
          console.info('update avaliable');
        });
      });

      wb.register()
        .then((registration) => {
          console.info('Service worker successfully installed');
          if (registration?.waiting) {
            console.info('update found');
            window.location.reload();
            wb.messageSkipWaiting();
          }
        })
        .catch(console.error);
    }
  }, []);

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
            <PrivateRoute path="/profile/:uid" component={(props: any) => <ProfilePage {...props} />} exact />
            <PrivateRoute path="/tournaments" component={TournamentPage} exact />
            <PrivateRoute
              path="/tournaments/:id"
              component={(props: any) => <SingleTournamentPage {...props} />}
              exact
            />

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

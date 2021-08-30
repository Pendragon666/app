import React, { useEffect, lazy, Suspense } from 'react';
// import io, { Socket } from 'socket.io-client';
import { SnackbarProvider } from 'notistack';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Routes
import {
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  TournamentPage,
  SingleTournamentPage,
  TeamsPage,
  LeaderboardPage,
} from 'pages';
import {
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { clearMessage, respondToInvite } from 'redux/actions/uiActions';
import { Workbox } from 'workbox-window';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { UIState } from 'redux/reducers/uiReducer';

const App: React.FC = () => {
  const PrivateRouteComponent = lazy(() => import('./uikits/PrivateRoute'));
  const PublicRouteComponent = lazy(() => import('./uikits/PublicRoute'));

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
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

  const UI: UIState = useAppSelector((state) => state.UI);
  const dispatch = useAppDispatch();
  const ClearMessage = () => dispatch(clearMessage());
  const RespondToInvite = (teamId: string, accept: boolean) => dispatch(respondToInvite(teamId, accept));

  const handleClose = (accept: boolean) => {
    return RespondToInvite(UI.teamInvite.id, accept);
  };

  return (
    <>
      <Suspense
        fallback={() => (
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}
          >
            <CircularProgress color="secondary" />
          </div>
        )}
      >
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Switch>
              {/* Public Routes */}
              <PublicRouteComponent path="/login" component={LoginPage} exact />
              <PublicRouteComponent path="/register" component={RegisterPage} exact />

              {/* Private Routes */}
              <PrivateRouteComponent path="/" component={HomePage} exact />
              <PrivateRouteComponent path="/leaderboard" component={LeaderboardPage} exact />
              <PrivateRouteComponent
                path="/profile/:uid"
                component={(props: any) => <ProfilePage {...props} />}
                exact
              />
              <PrivateRouteComponent path="/tournaments" component={TournamentPage} exact />
              <PrivateRouteComponent path="/teams" component={TeamsPage} exact />
              <PrivateRouteComponent
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
          <Dialog open={UI.teamInvite.invited} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">Invitation</DialogTitle>
            <DialogContent
              style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <img src={UI.teamInvite.image} alt="team" style={{ height: 70, marginBottom: 20 }} />
              <DialogContentText>You've been invited to team {UI.teamInvite.name}.</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose(false)} color="secondary">
                Decline
              </Button>
              <Button onClick={() => handleClose(true)} color="secondary">
                Accept
              </Button>
            </DialogActions>
          </Dialog>
        </SnackbarProvider>
      </Suspense>
    </>
  );
};

export default App;

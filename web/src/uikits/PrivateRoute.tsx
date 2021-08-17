import axios from 'axios';
import Cookie from 'js-cookie';
import decode from 'jwt-decode';
import { CreateProfile } from 'layouts';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// import { setInvite } from 'redux/actions/uiActions';
import { getProfile, setUser } from 'redux/actions/userActions';
import { useAppSelector } from 'redux/hooks';
import { UserState } from 'redux/reducers/userReducer';
// import io from 'socket.io-client';

const CheckAuth = () => {
  let token = Cookie.get('P-Token');
  let user: any;

  if (!token) {
    token = '';
    return { authenticated: false, user, token };
  }
  try {
    user = decode(token);
    if (user.exp < new Date().getTime() / 1000) {
      Cookie.remove('P-Token');
      token = '';
      return { authenticated: false, user, token };
    }
    axios.defaults.headers.common['P-Token'] = token; //setting authorize token to header in axios
  } catch (e) {
    return { authenticated: false, user, token };
  }
  return { authenticated: true, user, token };
};

// const Loading = (WrappedComponent: any) => {
//   // And return another component
//   const LoadingComponent = ({ Component, ...rest}) => {
//     const loading = useAppSelector((state) => state.UI.loading);

//     return <> {loading ? <h1>Loading...</h1> : <Component {...rest} />}</>;
//   };
//   return LoadingComponent;
// };

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const state = useMemo(() => CheckAuth(), []);

  const Profile: UserState = useAppSelector((state) => state.user);
  const loading = useAppSelector((state) => state.UI.loading);

  const dispatch = useDispatch();
  const SetUser = (data: any) => dispatch(setUser(data));
  // const SetInvite = (data: any) => dispatch(setInvite(data));
  const GetProfile = () => dispatch(getProfile());

  // useEffect(() => {
  //   const socket = io('http://localhost:5000/', {
  //     query: { token: state.token },
  //     // path: '/api/socket.io',
  //     // secure: process.env.NODE_ENV === 'production',
  //   });
  //   if (!Profile.profile?.inTeam && Profile.profile?.inTeam !== undefined) {
  //     socket.once('team_invitation', (msg) => {
  //       const { _id, teamName, teamImage, invitationId } = JSON.parse(msg);
  //       SetInvite({ teamInvite: { id: _id, name: teamName, image: teamImage, invited: true, invitationId } });
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Profile]);

  useEffect(() => {
    if (state.authenticated) {
      SetUser(state.user);
      GetProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (!loading)
    return (
      <Route
        {...rest}
        render={(props) =>
          state.authenticated ? (
            Profile.profileCreated ? (
              <Component {...props} />
            ) : (
              <CreateProfile />
            )
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  return <p>Hold on, fetching data might take some time.</p>;
};

export default PrivateRoute;

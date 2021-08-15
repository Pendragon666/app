import axios from 'axios';
import Cookie from 'js-cookie';
import decode from 'jwt-decode';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setInvite } from 'redux/actions/uiActions';
import { getProfile, setUser } from 'redux/actions/userActions';
import { useAppSelector } from 'redux/hooks';
import { UserState } from 'redux/reducers/userReducer';
import io from 'socket.io-client';

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

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const state = useMemo(() => CheckAuth(), []);
  const Profile: UserState = useAppSelector((state) => state.user);

  const dispatch = useDispatch();
  const SetUser = (data: any) => dispatch(setUser(data));
  const SetInvite = (data: any) => dispatch(setInvite(data));
  const GetProfile = (uid: string) => dispatch(getProfile(uid));

  useEffect(() => {
    const url = process.env.NODE_ENV === 'development' ? 'ws://localhost/api/' : 'ws://development.pendragon.gg/api/';
    const socket = io(url, {
      query: { token: state.token },
    });
    if (!Profile.profile?.inTeam && Profile.profile?.inTeam !== undefined) {
      socket.on('team_invitation', (msg) => {
        const { _id, teamName, teamImage, invitationId } = JSON.parse(msg);
        SetInvite({ teamInvite: { id: _id, name: teamName, image: teamImage, invited: true, invitationId } });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Profile]);

  useEffect(() => {
    if (state.authenticated) {
      SetUser(state.user);
      GetProfile(state.user._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Route {...rest} render={(props) => (state.authenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
  );
};

export default PrivateRoute;

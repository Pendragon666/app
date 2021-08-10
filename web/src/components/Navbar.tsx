import { createStyles, Theme, withStyles } from '@material-ui/core';
// import { logoutUser } from 'redux/actions/userActions';
// import { useDispatch } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import GroupIcon from '@material-ui/icons/Group';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  classes: any;
  history: RouteComponentProps['history'];
}

const styles = createStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      backgroundImage: 'linear-gradient(315deg, #485461 0%, #28313b 74%)',
      width: '100vw',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'space-between',
    },
  },
  layout: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      listStyle: 'none',
      '& li': {
        padding: '4.5px 0',
        fontSize: 13,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        '&:hover': {
          backgroundColor: 'rgb(7, 177, 77, 0.42)',
        },
      },
    },
  },
  layoutButtons: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
}));

const Navbar: React.FC<Props> = (props) => {
  const { classes, history } = props;

  const id = useSelector((state: any) => state.user.user._id);

  const [routes, setRoutes] = useState([
    { name: 'Home', path: '/', icon: <HomeIcon />, isSelected: false, clickable: true },
    { name: 'Tournaments', path: '/tournaments', icon: <SportsEsportsIcon />, isSelected: false, clickable: true },
    { name: 'Statistics', path: '/stats', icon: <EqualizerIcon />, isSelected: false, clickable: true },
    { name: 'Teams', path: '/teams', icon: <GroupIcon />, isSelected: false, clickable: true },
    { name: 'Profile', path: `/profile/${id}`, icon: <PersonIcon />, isSelected: false, clickable: true },
  ]);

  useEffect(() => {
    setRoutes(
      routes.map((route) => {
        if (route.path === history.location.pathname) {
          return {
            ...route,
            isSelected: true,
            clickable: false,
          };
        }
        return route;
      }),
    );

    if (id) {
      if (history.location.pathname.split('/')[2] === id) {
        setRoutes(
          routes.map((route) => {
            if (route.name === 'Profile') {
              return {
                ...route,
                isSelected: true,
                clickable: false,
              };
            }
            return route;
          }),
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname, id]);

  const handleRouteChange = (location: string, clickable: boolean) => {
    if (clickable) {
      return history.push(location);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <ul className={classes.layout}>
          {routes.map((route) => (
            <li
              key={route.name}
              style={route.isSelected ? { backgroundColor: 'green' } : {}}
              onClick={() => handleRouteChange(route.path, route.clickable)}
            >
              {route.icon}
              <p style={{ fontSize: 11 }}>{route.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default withStyles(styles)(Navbar);

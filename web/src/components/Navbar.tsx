import { createStyles, Theme, withStyles } from '@material-ui/core';
// import { logoutUser } from 'redux/actions/userActions';
// import { useDispatch } from 'react-redux';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  SportsEsports as SportsEsportsIcon,
  Group as GroupIcon,
  Star as StarIcon,
} from '@material-ui/icons';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
// import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';

interface Props {
  classes: any;
  history: RouteComponentProps['history'];
}

const styles = createStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'space-between',
      // margin: 2,
    },
  },
  layout: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      listStyle: 'none',
      '& li': {
        padding: '10.5px 0',
        fontSize: 13,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        color: 'gray',
      },
    },
  },
  iconActive: {
    [theme.breakpoints.down('sm')]: {
      boxShadow: '0 4px 0px -2px rgba(204,57,57,0.9)',
      color: 'rgba(204,57,57,0.9)',
    },
  },
  layoutButtons: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  empty: {},
}));

const Navbar: React.FC<Props> = (props) => {
  const { classes, history } = props;

  const animation = useSpring({ from: { marginLeft: 0 }, to: { marginLeft: 0 } });

  const id = useSelector((state: any) => state.user.user._id);

  const [routes, setRoutes] = useState([
    { value: 'main', path: '/', icon: <HomeIcon />, isSelected: false, clickable: true, isMiddle: false },
    {
      value: 'tournaments',
      path: '/tournaments',
      icon: <SportsEsportsIcon />,
      isSelected: false,
      clickable: true,
      isMiddle: false,
    },
    {
      value: 'leaderboard',
      path: '/leaderboard',
      icon: <StarIcon />,
      isSelected: false,
      clickable: true,
      isMiddle: true,
    },
    { value: 'teams', path: '/teams', icon: <GroupIcon />, isSelected: false, clickable: true, isMiddle: false },
    {
      value: 'profile',
      path: `/profile/${id}`,
      icon: <PersonIcon />,
      isSelected: false,
      clickable: true,
      isMiddle: false,
    },
  ]);

  useEffect(() => {
    setRoutes(
      routes.map((r) => {
        if (r.path === history.location.pathname) {
          return {
            ...r,
            isSelected: true,
            clickable: false,
          };
        }
        return {
          ...r,
          isSelected: false,
        };
      }),
    );
    if (id) {
      if (history.location.pathname.split('/')[2] === id) {
        setRoutes(
          routes.map((route) => {
            if (route.value === 'profile') {
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
  }, [id]);

  const handleRouteChange = (location: string, clickable: boolean) => {
    if (clickable) {
      return history.push(location);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <animated.ul className={classes.layout} style={animation}>
          {routes.map((route, i) => (
            <li key={i} onClick={() => handleRouteChange(route.path, route.clickable)}>
              <div className={route.isSelected ? classes.iconActive : ''}>{route.icon}</div>
            </li>
          ))}
        </animated.ul>
      </div>
    </>
  );
};

export default withStyles(styles)(Navbar);

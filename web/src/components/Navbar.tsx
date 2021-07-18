import { Button, createStyles, Hidden, withStyles } from '@material-ui/core';
import { logoutUser } from 'redux/actions/userActions';
import { useDispatch } from 'react-redux';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props {
  classes: any;
  history: RouteComponentProps['history'];
}

const styles = createStyles({
  sidebar: {
    backgroundColor: 'white',
    height: '100vh',
    width: '10vh',
  },
  navbar: {
    height: '100vh',
    width: '15vw',
  },
  rightNavbar: {
    width: '15vw',
    height: '95vh',
    backgroundColor: '#ffffff',
    backgroundImage: 'linear-gradient(315deg, #485461 0%, #28313b 74%)',
    display: 'flex',
    flexDirection: 'column',
  },
  topNavbar: {
    width: '100vw',
    height: '5vh',
    backgroundColor: '#ffffff',
    backgroundImage: 'linear-gradient(315deg, #485461 0%, #28313b 74%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topNavbarWrapper: {
    width: '93%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightButtons: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '3vh',
    '& button': {
      color: 'white',
    },
  },
});

const Navbar: React.FC<Props> = (props) => {
  const { classes, history } = props;

  const dispatch = useDispatch();
  const LogoutUser = () => dispatch(logoutUser());

  return (
    <Hidden smDown>
      <div className={classes.navbar}>
        <div className={classes.topNavbar}>
          <div className={classes.topNavbarWrapper}>
            <h1
              style={{
                fontFamily: 'ProdushRegular',
                color: 'white',
              }}
            >
              Pendragon
            </h1>
            <Button onClick={LogoutUser} style={{ color: 'white' }}>
              Logout
            </Button>
          </div>
        </div>
        <div className={classes.rightNavbar}>
          <div className={classes.rightButtons}>
            <Button onClick={() => history.push('/')}>Home</Button>
            <Button onClick={() => history.push('/profile')}>Profile</Button>
            <Button onClick={() => history.push('/tournaments')}>Tournaments</Button>
            <Button onClick={() => history.push('/stats')}>Stats</Button>
          </div>
        </div>
      </div>
    </Hidden>
  );
};

export default withStyles(styles)(Navbar);

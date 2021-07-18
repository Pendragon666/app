import React from 'react';
import { createStyles, withStyles } from '@material-ui/core';
import { Navbar, ProfileLayout } from 'components';

const styles = createStyles({
  main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#537895',
    backgroundImage: 'linear-gradient(315deg, #7f53ac 0%, #647dee 74%)',
  },
});

const Profile: React.FC = (props: any) => {
  const { classes, history } = props;

  return (
    <div className={classes.main}>
      <Navbar history={history} />
      <ProfileLayout />
    </div>
  );
};

export default withStyles(styles)(Profile);

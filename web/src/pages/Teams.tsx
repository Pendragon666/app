import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import { Navbar } from 'components';
import { TeamLayout } from 'layouts';

const styles = createStyles((theme: Theme) => ({
  main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    backgroundColor: 'white',

    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'space-between',
    },
  },
}));

const Teams: React.FC = (props: any) => {
  const { classes, history } = props;

  return (
    <div className={classes.main}>
      <Navbar history={history} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <TeamLayout />
      </div>
    </div>
  );
};

export default withStyles(styles)(Teams);

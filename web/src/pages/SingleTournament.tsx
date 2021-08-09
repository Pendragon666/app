import React, { useEffect } from 'react';
import { createStyles, withStyles } from '@material-ui/core';
import { Navbar } from 'components';

const styles = createStyles({
  main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const SingleTournament: React.FC = (props: any) => {
  const {
    classes,
    history,
    match: {
      params: { id },
    },
  } = props;

  useEffect(() => {}, [history, id]);

  return (
    <div className={classes.main}>
      <Navbar history={history} />
      <h1>Tournament</h1>
    </div>
  );
};

export default withStyles(styles)(SingleTournament);

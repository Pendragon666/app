import { Grid, createStyles, withStyles } from '@material-ui/core';
import React from 'react';

const styles = createStyles({
  container: {
    height: '95%',
    marginTop: '5vh',
  },
  wrapper: {},
  main: {
    color: 'red',
  },
});

const ProfileLayout: React.FC = (props: any) => {
  const { classes } = props;

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.wrapper}>
        <Grid container direction="row" justifyContent="space-around" alignItems="flex-start">
          <h1>test</h1>
          <h1>test 2</h1>
          <h1>test 3</h1>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ProfileLayout);

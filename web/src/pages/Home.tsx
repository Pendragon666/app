import React from 'react';
import { createStyles, withStyles } from '@material-ui/core';
import { Navbar } from 'components';
import { useEffect } from 'react';
import axios from 'axios';

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

const Home: React.FC = (props: any) => {
  const { classes, history } = props;

  useEffect(() => {
    axios.get('/api/').then((res) => console.info(res));
  }, []);

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
        }}
      >
        <img
          src="https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.15752-9/217495079_967475344051602_3982218914416428652_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeGn4K4yawWMqct3I_5yj-3lmsovXkm7oSyayi9eSbuhLHtfwhz_4oqTUpXxz1ulsukNMwPkiHPg2dDCKqChwBWa&_nc_ohc=dlg4Ttr_pnwAX-FlqJ4&_nc_ht=scontent.ftbs6-1.fna&oh=f5714223198c67729d06177da97fc6d8&oe=60F90FAA"
          alt="niangi_9"
          style={{ height: '600px' }}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);

import { Button, createStyles, Theme, Tooltip, withStyles } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import React from 'react';

interface Props {
  classes: any;
}

const dummyData = [
  {
    avatar: 'https://fastcdn.mobalytics.gg/assets/tft/images/champions/icons/set4/akali.png',
    victory: true,
    placement: '4th',
    position: 'Mid',
    kda: {
      value: 9.4,
      stats: '5/0/5',
    },
    vision: {
      value: 0.97,
      stats: '99%',
    },
    cs: {
      value: 9.9,
      stats: 200,
    },
    damage: {
      value: 551,
      stats: '41%',
    },
  },
  {
    avatar:
      'https://cdnb.artstation.com/p/assets/images/images/012/033/999/medium/thomas-randby-npe-ahri.jpg?1532668669',
    victory: false,
    placement: '1th',
    position: 'Mid',
    kda: {
      value: 6.4,
      stats: '9/0/6',
    },
    vision: {
      value: 0.55,
      stats: '66%',
    },
    cs: {
      value: 4.9,
      stats: 200,
    },
    damage: {
      value: 455,
      stats: '33%',
    },
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/664627454275751936/sTtzXCAq_400x400.png',
    victory: true,
    placement: '2th',
    position: 'Mid',
    kda: {
      value: 2.4,
      stats: '5/5/5',
    },
    vision: {
      value: 0.27,
      stats: '30%',
    },
    cs: {
      value: 4.9,
      stats: 200,
    },
    damage: {
      value: 544,
      stats: '44%',
    },
  },
  {
    avatar: 'https://fastcdn.mobalytics.gg/assets/tft/images/champions/icons/set4/akali.png',
    victory: false,
    placement: '9th',
    position: 'Mid',
    kda: {
      value: 2.4,
      stats: '5/5/5',
    },
    vision: {
      value: 0.27,
      stats: '30%',
    },
    cs: {
      value: 4.9,
      stats: 200,
    },
    damage: {
      value: 324,
      stats: '14%',
    },
  },
  {
    avatar:
      'https://cdnb.artstation.com/p/assets/images/images/012/033/999/medium/thomas-randby-npe-ahri.jpg?1532668669',
    victory: true,
    placement: '7th',
    position: 'Mid',
    kda: {
      value: 2.4,
      stats: '5/5/5',
    },
    vision: {
      value: 0.27,
      stats: '30%',
    },
    cs: {
      value: 4.9,
      stats: 200,
    },
    damage: {
      value: 234,
      stats: '12%',
    },
  },
  {
    avatar: 'https://fastcdn.mobalytics.gg/assets/tft/images/champions/icons/set4/akali.png',
    victory: true,
    placement: '4th',
    position: 'Mid',
    kda: {
      value: 2.4,
      stats: '5/5/5',
    },
    vision: {
      value: 0.27,
      stats: '30%',
    },
    cs: {
      value: 4.9,
      stats: 200,
    },
    damage: {
      value: 124,
      stats: '9%',
    },
  },
  {
    avatar:
      'https://cdnb.artstation.com/p/assets/images/images/012/033/999/medium/thomas-randby-npe-ahri.jpg?1532668669',
    victory: false,
    placement: '3th',
    position: 'Support',
    kda: {
      value: 2.4,
      stats: '5/5/5',
    },
    vision: {
      value: 0.27,
      stats: '30%',
    },
    cs: {
      value: 4.9,
      stats: 200,
    },
    damage: {
      value: 100,
      stats: '4%',
    },
  },
];

const styles = createStyles((theme: Theme) => ({
  main: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  info: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '20%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  stats: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '10%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
    },
  },
  history: {
    width: '90%',
    backgroundColor: '#333',
    height: 80,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    color: 'white',
    flexShrink: 0,
    '&:last-child': {
      marginBottom: 80,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '40%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'scroll',
    },
  },
  picture: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'flex',
      height: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      //       justifyContent: 'space-between',
      //       alignItems: 'center',
    },
  },
  buttons: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '20%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
}));

const ProfileLayout: React.FC<Props> = (props) => {
  const { classes } = props;
  return (
    <div className={classes.main}>
      <div className={classes.info}>
        <div className={classes.picture}>
          <img
            src="https://data.whicdn.com/images/322027365/original.jpg?t=1541703413"
            alt="profile image"
            style={{ height: 85, width: 85, borderRadius: '50%' }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <h3>Sebastian Maisuradze</h3>
              <Tooltip title="Verified" aria-label="verified" color="secondary">
                <VerifiedUserIcon />
              </Tooltip>
            </div>
            <p>@bluespringflowers</p>
          </div>
        </div>
      </div>
      <div className={classes.stats}>
        <p>Winrate: 56%</p>
        <p>Games: 16</p>
        <p>Tournament Won: 0</p>
        <p>Rank: Diamond I</p>
      </div>
      <div className={classes.history}>
        {dummyData.map((d, i) => (
          <div
            key={i}
            style={{
              width: '90%',
              backgroundColor: '#333',
              marginTop: 10,
              marginBottom: 10,
              display: 'flex',
              fontSize: 14,
            }}
          >
            {/* <div
              style={{
                width: '20%',
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={d.avatar} alt="akali" style={{ height: 53, borderRadius: '50%' }} />
            </div>
            <div
              style={{
                width: '80%',
                height: '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ fontSize: 16, color: d.victory ? 'lightblue' : 'red', margin: 0 }}>
                  {d.victory ? 'Victory' : 'Defeat'}
                </p>
                <ul
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    width: '50%',
                    listStyle: 'none',
                    margin: 0,
                    color: 'white',
                  }}
                >
                  <li>{d.placement}</li>
                  <li>{d.position}</li>
                </ul>
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '95%',
                  justifyContent: 'space-between',
                  color: 'white',
                  marginTop: 5,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <p>{d.kda.value} KDA</p>
                  <p>{d.kda.stats}</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <p>{d.vision.value} Vis/m</p>
                  <p>{d.vision.stats} KP</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <p>{d.cs.value} CS/Min.</p>
                  <p>{d.cs.stats} CS</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <p>{d.damage.value} DMG/Min.</p>
                  <p>{d.damage.stats} of team</p>
                </div>
              </div> */}
            {/* </div> */}
          </div>
        ))}
      </div>
      <div className={classes.buttons}>
        <Button
          style={{ width: '90%', marginTop: 'auto' }}
          color="primary"
          //   disabled
          variant="contained"
        >
          Edit
        </Button>
        <Button
          style={{ width: '90%', marginTop: 'auto', marginBottom: 20 }}
          color="secondary"
          disabled
          variant="contained"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(ProfileLayout);

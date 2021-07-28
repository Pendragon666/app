import React from 'react';
import { Grid, createStyles, withStyles, Card, CardContent, Tooltip } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = createStyles({
  container: {
    height: '95%',
    marginTop: '5vh',
  },
  main: {
    marginTop: '3%',
    width: '90%',
    height: '87vh',
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, .1)',
    flexDirection: 'row',
  },
  wrapper: {
    width: '40%',
    height: '100%',
  },
  rightMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '58%',
    height: '100%',
    marginRight: 'auto',
  },
  rightContent: {
    height: '50%',
  },
  profile: {
    height: '30%',
    width: '100%',
  },
  profileInfo: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    '& > *': {
      padding: 0,
      margin: 0,
    },
    '& strong': {
      color: 'white',
    },
  },
  statistics: { listStyle: 'none', height: '80%', '& strong': { color: 'yellow' } },
  history: {
    width: '90%',
    margin: 'auto',
    backgroundColor: '#333',
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    color: 'white',
    flexShrink: 0,
    '&:last-child': {
      marginBottom: 80,
    },
  },
});

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

const dummyTournament = [
  { name: 'Summer Cup #1', placement: 5, points: 100 },
  { name: 'Summer Cup #3', placement: 4, points: 150 },
  { name: 'Summer Cup #5', placement: 7, points: 20 },
  { name: 'Summer Cup #9', placement: 9, points: 0 },
  { name: 'Summer Cup #11', placement: 4, points: 150 },
  { name: 'Summer Cup #13', placement: 10, points: 0 },
  { name: 'Summer Cup #14', placement: 3, points: 200 },
  { name: 'Summer Cup #15', placement: 2, points: 300 },
  { name: 'Summer Cup #16', placement: 1, points: 500 },
  { name: 'Summer Cup #20', placement: 1, points: 500 },
];

const ProfileLayout: React.FC = (props: any) => {
  const { classes } = props;

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.mainWrapper}>
        <Grid container direction="row" justifyContent="space-around" alignItems="flex-start">
          <Card className={classes.main}>
            <CardContent className={classes.wrapper}>
              <div className={classes.profile}>
                <div className={classes.profileInfo}>
                  <img
                    src="https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.15752-9/219392440_836148807274680_7324351691549954799_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeHxZ1jyGzooH_S1G21vsDVXh2lxPf-8wQiHaXE9_7zBCMwks3s9m8HxveDsKNqpfruvEI8396--_o2F9mfRWJpb&_nc_ohc=1pmDW55YaYQAX8DRjqU&_nc_oc=AQkg6YEx5wADdUOia5QdJ5WNVV9lDeb_hnGRqDIQ8W6Jv3BPifUCCLh0CwQOcDiyyQk&_nc_ht=scontent.ftbs4-1.fna&oh=435975ba569c82553cac1240bbbad699&oe=6123E6CE"
                    alt="profile_image"
                    style={{ height: 99, borderRadius: 99 }}
                  />
                  <div style={{ margin: 'auto', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3 style={{ margin: 0, marginRight: 10, whiteSpace: 'nowrap' }}>Sebastian Maisuradze</h3>
                      <Tooltip title="This user is verified and confirmed by pendragon team.">
                        <CheckCircleIcon style={{ fill: 'lightblue' }} />
                      </Tooltip>
                    </div>
                    <p style={{ margin: 0, marginTop: 5, marginRight: 20 }}>@bluespringflower</p>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    width: '90%',
                    height: '100%',
                    margin: 'auto',
                    marginTop: 20,
                    fontSize: 18,
                  }}
                >
                  <ul className={classes.statistics}>
                    <li>
                      Rank: <strong>Silver 4</strong>
                    </li>
                    <li>
                      Last Match: <strong>14 minutes ago</strong>
                    </li>
                    <li>
                      Winrate: <strong>54.5%</strong>
                    </li>
                    <li>
                      Leaderboard: <strong>200</strong>
                    </li>
                    <li>
                      Role: <strong>Mid</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <div className={classes.rightMenu}>
              <CardContent className={classes.rightContent}>
                Previous Games:
                <div style={{ overflow: 'scroll', width: '100%', height: '100%' }}>
                  {dummyData.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        width: '90%',
                        margin: 'auto',
                        backgroundColor: '#333',
                        height: 100,
                        marginTop: 10,
                        marginBottom: 10,
                        display: 'flex',
                        fontSize: 14,
                      }}
                    >
                      <div
                        style={{
                          width: '20%',
                          height: '100%',
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
                          height: '100%',
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardContent className={classes.rightContent}>
                <p>History:</p>
                <div style={{ overflow: 'scroll', width: '100%', height: '100%' }}>
                  {dummyTournament.map((t, i) => (
                    <div key={i} className={classes.history}>
                      <div
                        style={{
                          width: '20%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <h2>{t.placement}</h2>
                      </div>
                      <div
                        style={{
                          width: '80%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <h4>
                          {t.name}
                          <span style={{ marginLeft: 30 }}>
                            Points Won: <span style={{ color: t.points > 0 ? 'green' : 'red' }}>{t.points}</span>
                          </span>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ProfileLayout);

import React from 'react';
import { createStyles, Theme, withStyles, TextField, MenuItem, Select, Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProfile } from 'redux/actions/userActions';

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
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },
  textField: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginTop: 30,
    },
  },
  select: {
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginTop: 30,
      '& :focus': {
        backgroundColor: 'white',
      },
    },
  },
}));

const CreateProfile: React.FC = (props: any) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const CreateProfile = (data: any) => dispatch(createProfile(data));

  const regions = [
    {
      value: 'EUNE',
      label: 'EUNE - Europe Nordic & East',
    },
    { value: 'EUW', label: 'EUW - Europe West' },
    { value: 'RU', label: 'RU - Russia' },
    { value: 'TR', label: 'TR - Turkey' },
  ];

  const handleChange = (value: string, type: string) => {
    if (type === 'fullName') {
      return setProfile({
        ...profile,
        fullName: value,
      });
    }
    if (type === 'region') {
      return setProfile({
        ...profile,
        region: value,
      });
    }
    if (type === 'description') {
      return setProfile({
        ...profile,
        description: value,
      });
    }
    if (type === 'leagueName') {
      return setProfile({
        ...profile,
        leagueName: value,
      });
    }
  };
  const handleSubmit = () => {
    if (profile.description && profile.fullName && profile.leagueName && profile.region) {
      CreateProfile(profile);
    }
  };

  const [profile, setProfile] = useState({
    fullName: '',
    region: regions[0].value,
    description: '',
    leagueName: '',
  });

  return (
    <div className={classes.main}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <h1>Create Profile</h1>

        <div
          style={{
            marginTop: 50,
            width: '80%',
            height: '60%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            className={classes.textField}
            placeholder="Full Name"
            type="text"
            value={profile.fullName}
            autoComplete="nope"
            onChange={(e) => handleChange(e.target.value, 'fullName')}
            inputProps={{
              autoComplete: 'full-name',
            }}
          />
          <Select
            className={classes.select}
            defaultValue="Select Region..."
            displayEmpty
            value={regions[0].value}
            onChange={(e: any) => handleChange(e.target.value, 'region')}
          >
            {regions.map((r) => (
              <MenuItem value={r.value} key={r.value}>
                {r.label}
              </MenuItem>
            ))}
          </Select>
          <TextField
            className={classes.textField}
            placeholder="League Name"
            type="text"
            value={profile.leagueName}
            autoComplete="nope"
            onChange={(e) => handleChange(e.target.value, 'leagueName')}
            inputProps={{
              autoComplete: 'league-name',
            }}
          />
          <TextField
            className={classes.textField}
            placeholder="Describe yourself"
            multiline
            rows={5}
            value={profile.description}
            onChange={(e) => handleChange(e.target.value, 'description')}
          />
        </div>
      </div>
      <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="secondary" style={{ width: '90%' }} onClick={handleSubmit}>
          Finish Profile
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(CreateProfile);

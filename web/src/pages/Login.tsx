import React from 'react';
import { Button, createStyles, TextField, withStyles, Theme } from '@material-ui/core';
import { useState } from 'react';
import { loginUser } from 'redux/actions/userActions';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isEmail } from 'utils/validators';

const styles = createStyles((theme: Theme) => ({
  main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage:
      'url("https://www.lifewire.com/thmb/xWwU0qxUmS6CZ9Vqgx1zXTNvQEA=/1250x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/wallhaven-5919d60a5f9b58f4c04e8b26.png")',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '20rem',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  btn: {
    marginTop: '1rem',
  },
  textField: {
    height: 50,
    '& .MuiInputBase-input': {
      color: '#fff', // Text color
      padding: 10,
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#fff8', // Semi-transparent underline
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#fff', // Solid underline on hover
    },
    '&:-webkit-autofill': {
      transitionDelay: '9999s',
      // transitionProperty: "background-color, color",
    },
    // "& .MuiInput-underline:after": {
    //   borderBottomColor: "#fff", // Solid underline on focus
    // },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

interface Fields {
  error: boolean;
  value: string;
}

const Login: React.FC = (props: any) => {
  const { classes } = props;

  const [email, setEmail] = useState<Fields>({
    value: '',
    error: false,
  });
  const [password, setPassword] = useState<Fields>({
    value: '',
    error: false,
  });
  const history = useHistory();

  const dispatch = useDispatch();
  const LoginUser = (u: any, h: any) => dispatch(loginUser(u, h));

  const handleClick = () => {
    if (email && password) {
      const user = {
        email: email.value,
        password: password.value,
      };
      LoginUser(user, history);
    }
  };

  const handleChange = (el: string, type: string) => {
    if (type === 'email') {
      const check = isEmail.test(el);
      if (check) {
        return setEmail({
          value: el,
          error: false,
        });
      }
      return setEmail({
        value: el,
        error: true,
      });
    }

    if (type === 'password') {
      if (el.length) {
        return setPassword({
          value: el,
          error: false,
        });
      }
      return setPassword({
        value: el,
        error: true,
      });
    }
  };

  return (
    <div className={classes.main}>
      <form className={classes.form}>
        <TextField
          className={classes.textField}
          placeholder="Email"
          type="email"
          value={email.value}
          autoComplete="nope"
          onChange={(e) => handleChange(e.target.value, 'email')}
          inputProps={{
            autoComplete: 'new-email',
          }}
        />
        <TextField
          className={classes.textField}
          placeholder="Password"
          type="password"
          value={password.value}
          autoComplete="nope"
          onChange={(e) => handleChange(e.target.value, 'password')}
          inputProps={{
            autoComplete: 'new-password',
          }}
        />
        <div className={classes.buttons}>
          <Button className={classes.btn} variant="contained" color="secondary" onClick={handleClick}>
            Start
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            color="secondary"
            onClick={() => history.push('/register')}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default withStyles(styles)(Login);

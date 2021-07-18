import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Button, createStyles, TextField, withStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { loginUser, requestNumber } from 'redux/actions/userActions';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const styles = createStyles({
  main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: "url('https://static2.lolwallpapers.net/2016/07/57868bc3a88f1.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '70% 30%',
    backgroundSize: 'cover',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  btn: {
    marginTop: '1rem',
    width: '20rem',
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
  datePicker: {
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
    '& .MuiIconButton-root': {
      color: 'white',
    },
    '&:-webkit-autofill': {
      transitionDelay: '9999s',
      // transitionProperty: "background-color, color",
    },
  },
});

const Register: React.FC = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = props;

  const [value, setValue] = useState({
    id: '',
    email: '',
    password: '',
    birthday: new Date() || null,
    number: '',
    code: '',
    confirmPassword: '',
  });

  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const history = useHistory();

  const dispatch = useDispatch();
  const LoginUser = (u: any, h: any) => dispatch(loginUser(u, h));
  const RequestCode = (phoneNumber: string) => dispatch(requestNumber(phoneNumber));

  const handleClick = () => {
    enqueueSnackbar('Application limited to beta users!', {
      variant: 'info',
    });

    const user = {
      email: value.email,
      password: value.password,
    };
    LoginUser(user, history);
  };

  const getCode = () => {
    if (value.number[0] === '5' && value.number.length === 9) {
      RequestCode(value.number);
      setSent(true);
    }
  };

  const handlePageChange = (page: number) => {
    if (page === 1 && value.id && value.email && value.password && value.confirmPassword) {
      setStep(page);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.main}>
        <form className={classes.form}>
          {step === 0 ? (
            <>
              <TextField
                className={classes.textField}
                placeholder="ID Number"
                type="text"
                value={value.id}
                autoComplete="nope"
                onChange={(e) =>
                  setValue({
                    ...value,
                    id: e.target.value,
                  })
                }
                inputProps={{
                  autoComplete: 'new-password',
                }}
              />
              <TextField
                className={classes.textField}
                placeholder="Email"
                type="email"
                value={value.email}
                autoComplete="nope"
                onChange={(e) =>
                  setValue({
                    ...value,
                    email: e.target.value,
                  })
                }
                inputProps={{
                  autoComplete: 'new-email',
                }}
              />
              <TextField
                className={classes.textField}
                placeholder="Password"
                type="password"
                value={value.password}
                autoComplete="nope"
                onChange={(e) =>
                  setValue({
                    ...value,
                    password: e.target.value,
                  })
                }
                inputProps={{
                  autoComplete: 'new-password',
                }}
              />
              <TextField
                className={classes.textField}
                placeholder="Confirm Password"
                type="password"
                value={value.confirmPassword}
                autoComplete="nope"
                onChange={(e) =>
                  setValue({
                    ...value,
                    confirmPassword: e.target.value,
                  })
                }
                inputProps={{
                  autoComplete: 'new-password',
                }}
              />
              <Button className={classes.btn} variant="contained" color="primary" onClick={() => handlePageChange(1)}>
                Continue
              </Button>
            </>
          ) : (
            <>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                format="MM/dd/yyyy"
                value={value.birthday}
                className={classes.datePicker}
                onChange={(birthday) => {
                  console.info(birthday);
                  setValue({
                    ...value,
                    birthday: new Date(birthday || ''),
                  });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <TextField
                className={classes.textField}
                placeholder="Number"
                type="text"
                value={value.number}
                autoComplete="nope"
                onChange={(e) =>
                  setValue({
                    ...value,
                    number: e.target.value,
                  })
                }
                inputProps={{
                  autoComplete: 'new-password',
                }}
              />

              {sent ? (
                <>
                  <TextField
                    className={classes.textField}
                    placeholder="Enter Code"
                    type="text"
                    value={value.code}
                    autoComplete="nope"
                    onChange={(e) =>
                      setValue({
                        ...value,
                        code: e.target.value,
                      })
                    }
                    inputProps={{
                      autoComplete: 'new-code',
                    }}
                  />
                  <Button className={classes.btn} variant="contained" color="primary" onClick={handleClick}>
                    Register
                  </Button>
                </>
              ) : (
                <Button className={classes.btn} variant="contained" color="primary" onClick={getCode}>
                  Get Code
                </Button>
              )}
            </>
          )}

          <p style={{ marginLeft: 'auto', color: 'white', cursor: 'pointer' }} onClick={() => history.push('/login')}>
            Already an user? log in
          </p>
        </form>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(Register);

import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Button, createStyles, TextField, Theme, withStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useState } from 'react';
import { createUser, requestNumber } from 'redux/actions/userActions';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail, isNum } from 'utils/validators';

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
  alreadyUser: {
    marginLeft: 'auto',
    color: '#303E4E',
    cursor: 'pointer',
    marginTop: 15,
    '&:hover': {
      textDecoration: 'underline',
    },
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
}));

const Register: React.FC = (props: any) => {
  const { classes } = props;

  const [value, setValue] = useState({
    id: {
      value: '',
      error: false,
    },
    email: {
      value: '',
      error: false,
    },
    password: {
      value: '',
      error: false,
    },
    birthday: new Date() || null,
    number: {
      value: '',
      error: false,
    },
    code: {
      value: '',
      error: false,
    },
    confirmPassword: {
      value: '',
      error: false,
    },
    username: {
      value: '',
      error: false,
    },
  });

  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const history = useHistory();

  const SMS = useSelector((state: any) => state.user.code);

  const dispatch = useDispatch();
  const RequestCode = (phoneNumber: string) => dispatch(requestNumber(phoneNumber));
  const CreateUser = (data: any, history: any) => dispatch(createUser(data, history));

  const handleChange = (el: string, change: string) => {
    if (change === 'id') {
      const check = isNum.test(el);
      if (el.length === 11 && check) {
        return setValue({
          ...value,
          id: {
            ...value.id,
            value: el,
            error: false,
          },
        });
      }
      return setValue({
        ...value,
        id: {
          value: el,
          error: true,
        },
      });
    }

    if (change === 'email') {
      const check = isEmail.test(el);
      if (check) {
        return setValue({
          ...value,
          email: {
            value: el,
            error: false,
          },
        });
      }
      return setValue({
        ...value,
        email: {
          value: el,
          error: true,
        },
      });
    }

    if (change === 'password') {
      if (el.length >= 6) {
        return setValue({
          ...value,
          password: {
            value: el,
            error: false,
          },
        });
      }
      return setValue({
        ...value,
        password: {
          value: el,
          error: true,
        },
      });
    }

    if (change === 'confirmPassword') {
      if (el === value.password.value) {
        return setValue({
          ...value,
          confirmPassword: {
            value: el,
            error: false,
          },
        });
      }
      return setValue({
        ...value,
        confirmPassword: {
          value: el,
          error: true,
        },
      });
    }

    if (change === 'number') {
      const check = isNum.test(el);
      if (el.length === 9 && check && el[0] === '5') {
        return setValue({
          ...value,
          number: {
            value: el,
            error: false,
          },
        });
      }
      return setValue({
        ...value,
        number: {
          value: el,
          error: true,
        },
      });
    }

    if (change === 'code') {
      const check = isNum.test(el);
      if (el.length === 5 && check) {
        return setValue({
          ...value,
          code: {
            value: el,
            error: false,
          },
        });
      }
      return setValue({
        ...value,
        code: {
          value: el,
          error: true,
        },
      });
    }

    if (change === 'username') {
      if (el.length) {
        return setValue({
          ...value,
          username: {
            value: el,
            error: false,
          },
        });
      }
      return setValue({
        ...value,
        username: {
          value: el,
          error: true,
        },
      });
    }
  };

  const getCode = () => {
    if (value.number.value[0] === '5' && value.number.value.length === 9) {
      RequestCode(value.number.value);
      setSent(true);
    }
  };

  const handlePageChange = (page: number) => {
    const checkErrors = !value.id.error && !value.confirmPassword.error && !value.email.error && !value.password.error;
    const checkValues = value.id.value && value.confirmPassword.value && value.email.value && value.password.value;
    if (page === 1 && checkErrors && checkValues) {
      setStep(page);
    }
  };

  const handleRegister = () => {
    const checkErrors =
      !value.id.error &&
      !value.confirmPassword.error &&
      !value.email.error &&
      !value.password.error &&
      !value.number.error &&
      !value.code.error;
    const checkValues =
      value.id.value &&
      value.confirmPassword.value &&
      value.email.value &&
      value.password.value &&
      value.number.value &&
      value.code.value;

    if (checkErrors && checkValues) {
      CreateUser(
        {
          username: value.username.value,
          password: value.password.value,
          birthday: value.birthday,
          email: value.email.value,
          number: value.number.value,
          code: value.code.value,
          national_id: value.id.value,
          _id: SMS.lastCode,
        },
        history,
      );
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
                placeholder="National ID"
                type="text"
                value={value.id.value}
                autoComplete="nope"
                error={value.id.error}
                onChange={(e) => handleChange(e.target.value, 'id')}
                inputProps={{
                  autoComplete: 'new-password',
                }}
              />
              <TextField
                className={classes.textField}
                placeholder="Email"
                type="email"
                error={value.email.error}
                value={value.email.value}
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
                value={value.password.value}
                autoComplete="nope"
                error={value.password.error}
                onChange={(e) => handleChange(e.target.value, 'password')}
                inputProps={{
                  autoComplete: 'new-password',
                }}
              />
              <TextField
                className={classes.textField}
                placeholder="Confirm Password"
                type="password"
                value={value.confirmPassword.value}
                error={value.confirmPassword.error}
                autoComplete="nope"
                onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
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
                placeholder="Username"
                type="text"
                value={value.username.value}
                error={value.username.error}
                onChange={(e) => handleChange(e.target.value, 'username')}
                inputProps={{
                  autoComplete: 'new-password',
                }}
              />
              <TextField
                className={classes.textField}
                placeholder="Phone Number"
                type="text"
                value={value.number.value}
                error={value.number.error}
                autoComplete="nope"
                onChange={(e) => handleChange(e.target.value, 'number')}
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
                    value={value.code.value}
                    error={value.code.error}
                    autoComplete="nope"
                    onChange={(e) => handleChange(e.target.value, 'code')}
                    inputProps={{
                      autoComplete: 'new-code',
                      maxLength: 5,
                    }}
                  />
                  <Button className={classes.btn} variant="contained" color="primary" onClick={handleRegister}>
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

          <p className={classes.alreadyUser} onClick={() => history.push('/login')}>
            Already an user? log in
          </p>
        </form>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(Register);

import React from "react";
import { Button, createStyles, TextField, withStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { loginUser } from "redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const styles = createStyles({
  main: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "url('https://static2.lolwallpapers.net/2016/07/57868bc3a88f1.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "70% 30%",
    backgroundSize: "cover",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    marginTop: "1rem",
    width: "20rem",
  },
  textField: {
    height: 50,
    "& .MuiInputBase-input": {
      color: "#fff", // Text color
      padding: 10,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#fff8", // Semi-transparent underline
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#fff", // Solid underline on hover
    },
    "&:-webkit-autofill": {
      transitionDelay: "9999s",
      // transitionProperty: "background-color, color",
    },
    // "& .MuiInput-underline:after": {
    //   borderBottomColor: "#fff", // Solid underline on focus
    // },
  },
});

const Login: React.FC = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();

  const dispatch = useDispatch();
  const LoginUser = (u: any, h: any) => dispatch(loginUser(u, h));

  const handleClick = () => {
    enqueueSnackbar("Application limited to beta users!", {
      variant: "info",
    });

    const user = {
      email,
      password,
    };
    LoginUser(user, history);
  };

  return (
    <div className={classes.main}>
      <form className={classes.form}>
        <TextField
          className={classes.textField}
          placeholder="Email"
          type="email"
          value={email}
          autoComplete="nope"
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{
            autoComplete: "new-email",
          }}
        />
        <TextField
          className={classes.textField}
          placeholder="Password"
          type="password"
          value={password}
          autoComplete="nope"
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{
            autoComplete: "new-password",
          }}
        />
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Start
        </Button>
      </form>
    </div>
  );
};

export default withStyles(styles)(Login);

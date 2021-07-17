import React from "react";
import { Button, createStyles, withStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logoutUser } from "redux/actions/userActions";

const styles = createStyles({
  main: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#537895",
    backgroundImage: "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)",
  },
  sidebar: {
    backgroundColor: "white",
    height: "100vh",
    width: "10vh",
  },
  navbar: {
    height: "100vh",
    width: "30vh",
  },
  rightNavbar: {
    width: "15vw",
    height: "95vh",
    backgroundColor: "#ffffff",
    backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
  },
  topNavbar: {
    width: "100vw",
    height: "5vh",
    backgroundColor: "#ffffff",
    backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topNavbarWrapper: {
    width: "93%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const Profile: React.FC = (props: any) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const LogoutUser = () => dispatch(logoutUser());

  return (
    <div className={classes.main}>
      <div className={classes.navbar}>
        <div className={classes.topNavbar}>
          <div className={classes.topNavbarWrapper}>
            <h1
              style={{
                fontFamily: "ProdushRegular",
                color: "white",
              }}
            >
              Pendragon
            </h1>
            <Button onClick={LogoutUser} style={{ color: "white" }}>
              Logout
            </Button>
          </div>
        </div>
        <div className={classes.rightNavbar}></div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Profile);

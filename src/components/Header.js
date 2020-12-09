import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";


//how you override the defaults of the material ui values
const useSytles = makeStyles({
  header:{
    // opacity: 0.2,
    width: '100%',
    margin: 0,
    color:'black'
  },
  buttonStyle: {
    color: "white",
    display: "flex",
    justifyContent: "space-around",
    textDecoration:'underline',

  },
  recipesStyle: {
    display: "flex",
    justifyContent: "flex-start",
    width: '300px',
    color: 'white',
    textDecoration:'underline'
  },
  container: {
    maxWidth:'300px',
    textDecoration:'none'
  }
});

export default function Header() {
  const classes = useSytles();

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <div className={classes.container}>
            <Typography variant="h6" className={classes.recipesStyle}>
              Boater Beta
            </Typography>
        </div>
          <Button className={classes.buttonStyle}>Sign In</Button>
          <Button className={classes.buttonStyle}>Create User</Button>
      </Toolbar>
    </AppBar>
  );
}
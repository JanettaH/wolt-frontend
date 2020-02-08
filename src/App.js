import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Restaurant from "./components/wolt/Restaurant";
import { useState, useEffect, useRef } from "react";

import axios from "axios";

import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  app: {
    backgroundColor: "#f0f0f0"
  },
  appBar: {
    backgroundColor: "#009be5"
  },
  root: {
    paddingTop: "80px"
  },
  formControl: {
    marginTop: "6px"
  }
}));

const App = () => {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = useState(0);
  const [value, setValue] = useState("");
  const [restaurants, setRestaurans] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/restaurants").then(response => {
      setRestaurans(response.data);
    });
  }, []);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const inputLabel = useRef(null);

  const handleChange = () => event => {
    setValue(event.target.value);

    if (event.target.value === "1") {
      const dataArray = [...restaurants];
      setRestaurans(dataArray.sort((a, b) => a.name.localeCompare(b.name)));
      console.log(dataArray);
      return;
    } else if (event.target.value === "2") {
      const dataArray = [...restaurants];
      setRestaurans(dataArray.sort((a, b) => b.name.localeCompare(a.name)));
      console.log(restaurants);

      return;
    }
  };

  return (
    <div className={classes.app}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>
            Not All Heroes Wear Capes{" "}
            <span aria-label="a rocket blasting off" role="img">
              💙
            </span>
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
              Sort by
            </InputLabel>
            <Select
              data-cy="atoz"
              native
              value={value}
              onChange={handleChange(value)}
              labelWidth={labelWidth}
              inputProps={{
                name: "format",
                id: "outlined-age-native-simple"
              }}
            >
              <option value="" />
              <option value={1} data-cy="atoz">
                A to Ö
              </option>
              <option value={2} data-cy="z">
                Ö to A
              </option>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      <Grid container justify="center" spacing={2} className={classes.root}>
        {restaurants.map((restaurant, index) => (
          <Grid item key={index}>
            <Restaurant key={index} sort={handleChange} data={restaurant} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;

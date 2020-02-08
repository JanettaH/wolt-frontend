import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import EuroIcon from "@material-ui/icons/EuroSymbol";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { Blurhash } from "react-blurhash";
import RoomIcon from "@material-ui/icons/Room";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import clsx from "clsx";
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  cont: {
    marginTop: "60px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: "68px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  filter: {
    width: "132px",
    justify: "center"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  hide: {
    display: "none"
  },
  title: {
    padding: "6px",
    paddingTop: "7px"
  },
  button: {
    padding: 2,
    float: "right"
  },
  euro: {
    fontSize: "14px",
    paddingTop: "3px"
  },
  foodIcon: {
    color: "#808080",
    marginRight: "7px"
  },
  content: {
    marginBottom: "1px",
    paddingBottom: "1px"
  }
}));

const Restaurant = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const convertPrice = price => {
    price = price / 100;

    return price.toString();
  };

  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Blurhash
          onLoad={handleLoad}
          {...(loaded && { style: { display: "none" } })}
          hash={data.blurhash}
          width={345}
          height={140}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
        <CardMedia
          {...(!loaded && { style: { display: "none" } })}
          onLoad={handleLoad}
          component="img"
          alt="Imagine yummy cheeseburger here"
          height="140"
          image={data.image}
          title="I know you want me, just click me already"
        />

        <CardContent className={classes.title} onClick={handleExpandClick}>
          <Typography gutterBottom variant="subtitle2" component="h2">
            {data.name}
            {"     -    "}
            {convertPrice(data.delivery_price)}
            <EuroIcon className={classes.euro} fontSize="small" />
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Collapse
        className={classes.contet}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent className={classes.contet}>
          <Typography paragraph>
            {" "}
            <RestaurantIcon className={classes.foodIcon} fontSize="small" />
            {data.description}
          </Typography>
          <Typography paragraph>
            {" "}
            <RoomIcon className={classes.foodIcon} fontSize="small" />
            {data.city}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Restaurant;

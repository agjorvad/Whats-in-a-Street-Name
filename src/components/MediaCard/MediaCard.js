import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    display: 'inline-block',
    overflow: 'hidden',
    float: 'left',
    height: 'auto',
    border: '2px solid black',
    textAlign: 'center',
    maxWidth: 345,
    align: 'center',
},
  media: {
    height: 75,
    paddingTop: '56.25%', // 16:9
  },
};

function SimpleMediaCard(props) {
  const { classes } = props;
  return (
<div>
<Card className={classes.card}>
    <CardMedia
        className={classes.media}
        // style={{height: "250px"}}
        image="images/sir-isaac-newton-9422656-1-402.jpg"
        title="Isaac Newton" />
    <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
            {props.selectedPlace.name}
        </Typography>
        <Typography component="p">
            {props.selectedPlace.history}
        </Typography>
    </CardContent>
    <CardActions>
        <Button size="small" color="primary">
            <a href={props.selectedPlace.link_url} target="_blank">Learn More</a>
        </Button>
        <Button size="small" color="primary">
            <a href="http://localhost:3000/map" target="_blank">Lear</a>
        </Button>
    </CardActions>
</Card>
</div>
  );
}


SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
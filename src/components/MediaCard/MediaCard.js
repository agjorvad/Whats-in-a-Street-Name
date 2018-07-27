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
    objectFit: 'contain'
},
  media: {
    height: 110,
    paddingTop: '56.25%', // 16:9
    objectFit: 'contain'
  },
};

function SimpleMediaCard(props) {
  const { classes } = props;
  console.log(props.selectedPlace.image_url)
  return (
<div>
<Card className={classes.card}>
    <CardMedia
        className={classes.media}
        image={props.selectedPlace.image_url}
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
        <Button size="small" color="link">
            <a href={props.selectedPlace.link_url} target="_blank">Learn More</a>
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

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  card: {
    width: 400,
    maxWidth: 400,
    margin: 30
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  content: {
    textAlign: 'center'
  },
  button: {
    width: '100%'
  }
});

class RecipeReviewCard extends React.Component {
  render() {
    const { classes, image, next, date } = this.props;
    if (image) {
      return (
        <Card className={classes.card}>
          <CardHeader subheader={`${date}의 점심`} />
          <CardMedia className={classes.media} image={image} title="Paella dish" />
          <CardContent className={classes.content}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                next();
              }}
            >
              오늘의 런치
            </Button>
          </CardContent>
        </Card>
      );
    } else {
      console.log(image);
      return <span className="err">500 ERROR</span>;
    }
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);

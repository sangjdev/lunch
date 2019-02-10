import React, { Component } from 'react';
import axios from '../../lib/request';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Gallery from '../gallery';
import moment from 'moment';
import 'moment/locale/ko';

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '100vh',
    background: '#6f80de'
  }
});

class index extends Component {
  state = {
    image: 'defaultImage',
    date: ''
  };
  next = async () => {
    const result = await axios.get('/image');
    const image = `data:image/png;base64,${result.data.base64data}`;
    this.setState({
      image: image,
      date: moment().format('MMM Do')
    });
  };
  async componentDidMount() {
    try {
      const result = await axios.get('/image');
      const image = `data:image/png;base64,${result.data.base64data}`;
      this.setState({
        image: image,
        date: moment().format('MMM Do')
      });
    } catch (e) {}
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Gallery
            image={this.state.image}
            date={this.state.date}
            next={this.next}
          />
        </Grid>
      </div>
    );
  }
}

index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(index);

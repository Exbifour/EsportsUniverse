import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FingerprintIcon from '@material-ui/icons/FingerprintOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';


const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  paper: {
    height: 'auto',
    padding: theme.spacing.unit * 4,
  },
  grid: {
    height: 200,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  innerButton: {
    padding: theme.spacing.unit,
  }
});

class Disciplines extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Grid container className={classes.grid} justify='center' spacing={16} alignItems='center'>
          <Paper className={classes.paper} elevation={1}>
            <Dialog open={open} onClose={this.handleClose}>
              <DialogTitle>Super Secret Password</DialogTitle>
              <DialogContent>
                <DialogContentText>1-2-3-4-5</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={this.handleClose}>
                  <CheckCircleIcon className={classes.leftIcon} />
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            <Typography variant="h4" gutterBottom>
              Esports universe
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Not an example anymore :)
            </Typography>
              <Button variant="outlined" color="secondary" onClick={this.handleOpen}>
                <FingerprintIcon className={classes.leftIcon} />
                Super Secret Password
              </Button>
            <br />
              <Link component={RouterLink} to='/teams'>
                <Button variant="contained" color="primary">
                    Go to teams
                </Button>
              </Link>
          </Paper>
        </Grid>
      </div>
    );
  }
}

Disciplines.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Disciplines);

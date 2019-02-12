import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: 'auto',
        maxWidth: 800,
    },
    firstRow: {
        height: 300,
    },
    secondRow: {
        height: 100,
    },
    paper: {
        width: '100%',
        height: '100%',
        padding: theme.spacing.unit,
        color: theme.palette.text.secondary,
    },
})

class Teams extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container className={classes.firstRow} justify='center' height={400} direction='row' alignItems='stretch' spacing={16}>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <Typography variant='headline' gutterBottom>
                                You are on a Teams page
                                </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Typography variant='body2' gutterBottom>
                                Small paper
                                </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container className={classes.secondRow} direction='row' justify='flex-start' alignItems='stretch' spacing={16}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Typography variant='subheading' gutterBottom>
                                I'm here sitting below them.
                                </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Teams.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teams);
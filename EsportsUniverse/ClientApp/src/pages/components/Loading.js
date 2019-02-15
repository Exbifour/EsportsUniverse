import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        width: "100%",
    },
    progress: {
        marginLeft: '45%',
        marginRight: '45%',
        width: '10%',
    },
});

function Loading(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <CircularProgress className={classes.progress} />
        </div>
    );
}


Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withLocalize } from "react-localize-redux";
import unfinishedTranslations from "../translations/unfinished.json";
import { Translate } from "react-localize-redux";
import BuildIcon from "@material-ui/icons/BuildOutlined";

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

class Unfinished extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(unfinishedTranslations);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify='center' direction='row' alignItems='stretch' spacing={16}>
                    <Grid item xs={10} justify='center'>
                        <Paper className={classes.paper}>
                            <BuildIcon fontSize="large" />
                            <BuildIcon fontSize="large" />
                            <BuildIcon fontSize="large" />
                            <Typography variant='h3' gutterBottom>
                                <Translate id="title" />
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Unfinished.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(Unfinished));
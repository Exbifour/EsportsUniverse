import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withLocalize } from "react-localize-redux";
import teamsTranslations from "../translations/teams.json";
import { Translate } from "react-localize-redux";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

import IconButton from '@material-ui/core/IconButton';
import FastForwardIcon from '@material-ui/icons/FastForwardOutlined';

const styles = theme => ({
    root: {
        margin: 'auto',
        maxWidth: 600,
    },
    paper: {
        width: '100%',
        height: '100%',
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
})

class Teams extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(teamsTranslations);

        this.state = { teams: [], loading: true };

        fetch('api/Teams')
            .then(response => response.json())
            .then(data => {
                this.setState({ teams: data, loading: false });
            });
    }

    renderTable(data) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            <Translate id="table.name" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.abbreviation" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.discipline" />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(team => (

                        <TableRow key={team.id} hover={true}>
                            <TableCell align="left">{team.name}</TableCell>
                            <TableCell align="left">{team.abbrebiation}</TableCell>
                            <TableCell align="left">{team.discipline.abbreviation}</TableCell>
                            <Link component={RouterLink} color="inherit" to={'/teams/' + team.id}>
                                <IconButton aria-label="Forward" >
                                    <FastForwardIcon />
                                </IconButton>
                            </Link>
                        </TableRow>


                    ))}
                </TableBody>
            </Table>
        )
    }

    renderLoading() {
        return (
            <Typography variant='h6' gutterBottom>
                Loading....
            </Typography>
        )
    }

    render() {
        const { classes } = this.props;

        let table = this.state.loading
            ? this.renderLoading()
            : this.renderTable(this.state.teams);

        return (
            <div className={classes.root}>
                <Grid container justify='center' direction='row' alignItems='stretch' spacing={16}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant='h5' gutterBottom>
                                <Translate id="general.title" />
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} alignItems='stretch'>
                        <Paper className={classes.paper}>
                            {table}
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

export default withLocalize(withStyles(styles)(Teams));
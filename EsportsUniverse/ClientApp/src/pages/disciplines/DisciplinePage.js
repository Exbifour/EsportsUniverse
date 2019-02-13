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
import disciplinesTranslations from "../translations/disciplines.json";

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

class DisciplinePage extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(disciplinesTranslations);

        this.state = { teams: [], loading: true };

        fetch('http://localhost:49752/api/Disciplines/' + this.props.match.params.id, { method: "GET" })
            .then(response => response.json())
            .then(recieved => {
                this.setState({ data: recieved, loading: false });
            })
            .catch(error => console.log(error));
    }

    renderTeamsTable(data) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            <Translate id="page.table.name" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="page.table.abbreviation" />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(team => (
                        <TableRow key={team.id} hover={true}>
                            <TableCell align="left">{team.name}</TableCell>
                            <TableCell align="left">{team.abbrebiation}</TableCell>
                            <Link component={RouterLink} color="inherit" to={'/teamProfile/' + team.id}>
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

    renderHeader() {
        return (
            <div>
                <Typography variant='h5' gutterBottom>
                    {this.state.data.abbreviation}
                </Typography>
                <Typography variant='overline text' gutterBottom>
                    {this.state.data.title}
                </Typography>
                <Typography variant='subtitle1' gutterBottom>
                    {this.state.data.description}
                </Typography>
            </div>
        )
    }

    render() {
        const { classes } = this.props;

        let table = this.state.loading
            ? this.renderLoading()
            : this.renderTeamsTable(this.state.data.teams);

        let header = this.state.loading
            ? this.renderLoading()
            : this.renderHeader(this.state.data);
        return (
            <div className={classes.root}>
                <Grid container justify='center' direction='row' alignItems='stretch' spacing={16}>
                    <Grid item xs={10}>
                        <Paper className={classes.paper}>
                            {header}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} alignItems='stretch'>
                        <Paper className={classes.paper}>
                            <Typography variant='body1' gutterBottom>
                                <Translate id="page.table.title" />
                            </Typography>
                            {table}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

DisciplinePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(DisciplinePage));
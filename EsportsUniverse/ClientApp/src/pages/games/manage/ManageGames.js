import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Loading from '../../components/Loading';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddOutlined'
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

import { withLocalize } from "react-localize-redux";
import gamesTranslations from "../../translations/games.json";
import { Translate } from "react-localize-redux";


const styles = theme => ({
    root: {
        margin: 'auto',
        maxWidth: 1000,
    },
    paper: {
        width: '100%',
        height: '100%',
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    extendedIcon: {
        marhinRight: theme.spacing.unit,
    }
})

class ManageGames extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(gamesTranslations);

        this.state = { games: [], loading: true };

        fetch('../api/Games')
            .then(response => response.json())
            .then(data => {
                this.setState({ games: data, loading: false });
            })
            .catch(error => console.log(error));
    }

    renderTable(data) {
        return (
            <Table padding="dense">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">
                            <Translate id="edit.discipline" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="edit.team1" />
                        </TableCell>
                        <TableCell align="left">
                            vs
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="edit.team2" />
                        </TableCell>
                        {/* <TableCell align="left">
                            <Translate id="table.dateStart" />
                        </TableCell> */}
                        <TableCell align="left">
                            <Translate id="table.timeStart" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.actions" />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(game => (
                        <TableRow key={game.id} hover={true}>
                            <TableCell component="th" scope="row">
                                {game.id}
                            </TableCell>
                            <TableCell align="left">{game.disciplin.abbreviation}</TableCell>
                            <TableCell align="left">{game.matchedTeams.team[0].name}</TableCell>
                            <TableCell align="left">vs</TableCell>
                            <TableCell align="left">{game.matchedTeams.team[1].name}</TableCell>
                            <TableCell align="left">{game.matchedTeams.toLocaleTimeString()}</TableCell>
                            <TableCell align="left">{game.startDateTime}</TableCell>
                            <TableCell align="left">
                                {/* <Link component={RouterLink} color="inherit" to={'/manage/games/' + game.id} >
                                    <IconButton aria-label="Edit" >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Link> */}
                                <IconButton
                                    aria-label="Delete"
                                    onClick={() => {
                                        fetch('../api/Games/' + game.id, {
                                            method: 'DELETE',
                                        })
                                            .then(response => response.json())
                                            .then(function (text) {
                                                console.log('Request successful', text);
                                            })
                                            .then(() => {
                                                let filtered = this.state.game.filter(el => el.id !== game.id);
                                                this.setState({ game: filtered });
                                            })
                                            .catch(function (error) {
                                                console.log('Delete failed', error);
                                            });
                                    }
                                    }>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    render() {
        const { classes } = this.props;

        let table = this.state.loading
            ? <Loading />
            : this.renderTable(this.state.games);

        return (
            <div className={classes.root}>
                <Grid container justify='center' direction='row' alignItems='stretch' spacing={16}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant='h5' gutterBottom>
                                <Translate id="manage.title" />
                            </Typography>
                            <Link component={RouterLink} color="inherit" to='/manage/add/game'>
                                <Fab variant="extended" color="primary" size='medium' aria-label="add">
                                    <AddIcon className={classes.extendedIcon} />
                                    <Translate id="manage.addButton" />
                                </Fab>
                            </Link>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {table}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ManageGames.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(ManageGames));
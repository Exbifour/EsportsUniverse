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

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

import { withLocalize } from "react-localize-redux";
import playersTranslations from "../../translations/players.json";
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
})

class ManagePlayers extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(playersTranslations);

        this.state = { players: [], loading: true };

        fetch('../api/Players')
            .then(response => response.json())
            .then(data => {
                this.setState({ players: data, loading: false });
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
                            <Translate id="table.nickName" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.firstName" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.lastName" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.team" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.discipline" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.actions" />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(player => (
                        <TableRow key={player.id} hover={true}>
                            <TableCell component="th" scope="row">
                                {player.id}
                            </TableCell>
                            <TableCell align="left">{player.name}</TableCell>
                            <TableCell align="left">{player.abbrebiation}</TableCell>
                            <TableCell align="left">{player.team.abbrebiation}</TableCell>
                            <TableCell align="left">{player.team.discipline.abbreviation}</TableCell>
                            <TableCell align="left">
                                <Link component={RouterLink} color="inherit" to={'/manage/players/' + player.id} >
                                    <IconButton aria-label="Edit" >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Link>
                                <IconButton
                                    aria-label="Delete"
                                    onClick={() => {
                                        fetch('../api/Players/' + player.id, {
                                            method: 'DELETE',
                                        })
                                            .then(response => response.json())
                                            .then(function (text) {
                                                console.log('Request successful', text);
                                            })
                                            .then(() => {
                                                let filtered = this.state.players.filter(el => el.id !== player.id);
                                                this.setState({ players: filtered });
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
            : this.renderTable(this.state.players);

        return (
            <div className={classes.root}>
                <Grid container justify='center' direction='row' alignItems='stretch' spacing={16}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant='h5' gutterBottom>
                                <Translate id="manage.title" />
                            </Typography>
                            <Link component={RouterLink} color="inherit" to='/manage/add/player'>
                                <Button variant="contained" color="primary">
                                    <Translate id="manage.addButton" />
                                </Button>
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

ManagePlayers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(ManagePlayers));
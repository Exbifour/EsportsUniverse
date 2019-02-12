import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withLocalize } from "react-localize-redux";
import disciplinesTranslations from "../translations/disciplines.json";
import { Translate } from "react-localize-redux";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';


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

class ManageDisciplines extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(disciplinesTranslations);

        this.state = { disciplines: [], loading: true };

        fetch('api/Disciplines')
            .then(response => response.json())
            .then(data => {
                this.setState({ disciplines: data, loading: false });
            });
    }

    renderTable(data) {
        return (
            <Table padding="dense">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">
                            <Translate id="table.title" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.abbreviation" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.dateAdded" />
                        </TableCell>
                        <TableCell align="left">
                            <Translate id="table.actions" />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(discipline => (
                        <TableRow key={discipline.id} hover={true}>
                            <TableCell component="th" scope="row">
                                {discipline.id}
                            </TableCell>
                            <TableCell align="left">{discipline.title}</TableCell>
                            <TableCell align="left">{discipline.abbreviation}</TableCell>
                            <TableCell align="left">{discipline.dateAdded}</TableCell>
                            <TableCell align="left">
                                <Link component={ RouterLink }color="inherit" to={ '/manageDisciplines/edit/' + discipline.id } >
                                    <IconButton aria-label="Edit" >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Link>
                                <IconButton
                                    aria-label="Delete"
                                    onClick={ () => {
                                        fetch('api/Disciplines/' + discipline.id, {
                                            method: 'DELETE',
                                        })
                                        .then(response => response.json())
                                        .then(function (text) {
                                            console.log('Request successful', text);
                                        })
                                        .catch(function (error) {
                                            console.log('Delete failed', error);
                                        });
                                        let filtered = this.state.disciplines.filter(el => el.id !== discipline.id);
                                        this.setState({ disciplines: filtered });
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

    renderLoading() {
        return(
            <Typography variant='h6' gutterBottom>
                Loading....
            </Typography>
        )
    }

    render() {
        const { classes } = this.props;

        let table = this.state.loading 
            ? this.renderLoading() 
            : this.renderTable(this.state.disciplines);

        return (
            <div className={classes.root}>
                <Grid container justify='center' direction='row' alignItems='stretch' spacing={16}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant='headline' gutterBottom>
                                <Translate id="manage.title" />
                            </Typography>
                            <Link component={RouterLink} color="inherit" to='/manageDisciplines/add'>
                                <Button variant="contained" color="primary">
                                    <Translate id="manage.addButton" />
                                </Button>
                            </Link>
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

ManageDisciplines.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(ManageDisciplines));
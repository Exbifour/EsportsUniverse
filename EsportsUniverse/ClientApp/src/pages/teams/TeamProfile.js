import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Loading from '../components/Loading';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

import IconButton from '@material-ui/core/IconButton';
import FastForwardIcon from '@material-ui/icons/FastForwardOutlined';

import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import teamsTranslations from "../translations/teams.json";

const styles = theme => ({
    root: {
        margin: 'auto',
        maxWidth: 800,
    },
    paper: {
        width: '100%',
        heigh: 'auto',
        padding: theme.spacing.unit,
        color: theme.palette.text.secondary,
        textAlign: 'center'
    },
    paperOuter: {
        marginTop: theme.spacing.unit * 4,
        width: '100%',
        heigh: 'auto',
        padding: theme.spacing.unit,
        color: theme.palette.text.secondary,
        textAlign: 'center'
    },
    additionalInfo: {
        marginLeft: theme.spacing.unit * 2,
        height: '20%',
        width: '100%',
    },
    gridCell: {
        maxWidth: '20%'
    }
})

class TeamProfile extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(teamsTranslations);

        this.state = { team: [], loading: true };

        fetch('../api/Teams/' + this.props.match.params.id, { method: "GET" })
            .then(response => response.json())
            .then(recieved => {
                this.setState({ team: recieved, loading: false });
            })
            .catch(error => console.log(error));
    }

    renderTitle(data) {
        const { classes } = this.props;

        return (
            <Grid container height={100} spacing={16}>
                <Grid item xs={12}>
                    <Typography variant='h4' className={classes.centeredText} gutterBottom>
                        {data.name}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant='subtitle1' gutterBottom>
                            <Translate id='table.abbreviation' />
                        </Typography>
                        <Typography variant='body2' gutterBottom>
                            {data.abbreviation}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant='subtitle1' gutterBottom>
                            <Translate id='table.discipline' />
                        </Typography>
                        <Typography variant='body2' gutterBottom>
                            {data.discipline.abbreviation}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
        )
    }

    renderPlayers(data) {
        const { classes } = this.props;

        return (
            <GridList cellHeight={120} xs={12} cols={2} spacing={8} className={classes.gridList}>
                {data.map(tile => (
                    <GridListTile className={classes.gridCell} key={tile.nickname}>
                        <Link component={RouterLink} color="inherit" to={'/players/' + tile.id}>
                            <img src="http://mcgrawwentworth.com/wp-content/themes/openmind/img/no_image.png" alt={tile.nickname + ' photo'} />
                        </Link>
                        <GridListTileBar
                            title={tile.nickname}
                            subtitle={<span>{tile.firstName + " " + tile.lastName}</span>}
                            actionIcon={
                                <Link component={RouterLink} color="inherit" to={'/players/' + tile.id}>
                                    <IconButton aria-label="Forward" >
                                        <FastForwardIcon font="small" />
                                    </IconButton>
                                </Link>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        )
    }

    render() {
        const { classes } = this.props;

        let title = this.state.loading
            ? <Loading />
            : this.renderTitle(this.state.team);

        let players = this.state.loading
            ? <Loading />
            : this.renderPlayers(this.state.team.players);

        // let pastGames = this.state.loading
        //     ? <Loading />
        //     : this.renderPlayers(this.state.team.teamGames);

        return (
            <div className={classes.root}>
                <Paper className={classes.paperOuter} >
                    {title}
                </Paper>
                <Paper className={classes.paperOuter}>
                    <Typography variant='h6' className={classes.centeredText} gutterBottom>
                        <Translate id="profile.players" />
                    </Typography>
                    {players}
                </Paper>
                {/* <Paper className={classes.paperOuter}>
                    <Typography variant='h6' className={classes.centeredText} gutterBottom>
                        <Translate id="profile.players" />
                    </Typography>
                    {pastGames}
                </Paper> */}
            </div>
        );
    }
}

TeamProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(TeamProfile));
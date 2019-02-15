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
import playersTranslations from "../translations/players.json";

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
    },
    paperOuter: {
        marginTop: theme.spacing.unit * 4,
        width: '100%',
        heigh: 'auto',
        padding: theme.spacing.unit,
        color: theme.palette.text.secondary,
    },
    headingPic: {
        height: '100%',
        overflow: 'hidden',
    },
    headingGrid: {
        width: "100%",
    }
})

class PlayerProfile extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(playersTranslations);

        this.state = { player: [], loading: true };

        fetch('../api/players/' + this.props.match.params.id, { method: "GET" })
            .then(response => response.json())
            .then(recieved => {
                this.setState({ player: recieved, loading: false });
            })
            .catch(error => console.log(error));
        
    }

    renderTitle(data) {
        const { classes } = this.props;

        return (
            <Grid container height={140} spacing={4} alignItems="flex-start" justify="flex-start">
                <Grid item xs={3}>
                    <img src="http://mcgrawwentworth.com/wp-content/themes/openmind/img/no_image.png" alt={data.nickname + ' photo'} />
                </Grid>
                <Grid item xs={9}>
                    <div className={classes.headingGrid}>
                        <Typography variant='h4' gutterBottom>
                            {data.nickname}
                        </Typography>
                    </div>
                    <div className={classes.headingGrid}>
                        <Typography variant='h6' gutterBottom>
                            {"(" + data.firstName + " " + data.lastName + ")"}
                        </Typography>
                    </div>
                    <div className={classes.headingGrid}>
                        <Typography variant='h6' gutterBottom>
                            <Translate id="profile.inTeam" />
                            {" "}
                            <Link component={RouterLink} color="inherit" to={'/teams/' + data.team.id}>
                                {data.team.name}
                            </Link>
                            {" "}
                            <Link component={RouterLink} color="inherit" to={'/disciplines/' + data.team.discipline.id}>
                                {"(" + data.team.discipline.abbreviation + ")" }
                            </Link>
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        )
    }

    render() {
        const { classes } = this.props;

        let heading = this.state.loading
            ? <Loading />
            : this.renderTitle(this.state.player);

        // let pastGames = this.state.loading
        //     ? <Loading />
        //     : this.renderPlayers(this.state.team.players);

        // let games = this.state.loading
        //     ? <Loading />
        //     : this.renderPlayers(this.state.team.teamGames);

        return (
            <div className={classes.root}>
                <Paper className={classes.paperOuter} >
                    {heading}
                </Paper>
                <Paper className={classes.paperOuter}>
                    <Typography variant='h6' className={classes.centeredText} gutterBottom>
                        <Translate id="profile.pastGames" />
                    </Typography>
                    {/* {pastGames} */}
                </Paper>
            </div>
        );
    }
}

PlayerProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(PlayerProfile));
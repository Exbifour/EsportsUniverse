import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import FastForwardIcon from '@material-ui/icons/FastForwardOutlined';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withLocalize } from "react-localize-redux";
import disciplinesTranslations from "../translations/disciplines.json";
import { Translate } from "react-localize-redux";

const styles = theme => ({
    root: {
        textAlign: 'center',
        padding: theme.spacing.unit * 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        height: 'auto',
        padding: theme.spacing.unit * 4,
    },
    grid: {
        height: 200,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    innerButton: {
        padding: theme.spacing.unit,
    },
    gridList: {
        width: 800,
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class Disciplines extends React.Component {
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

    render() {
        const { classes } = this.props;
        const data = this.state.disciplines;

        return (
            <div className={classes.root}>
                <GridList cellHeight={200} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">
                            <Translate id="table.subheader" />
                        </ListSubheader>
                    </GridListTile>
                    {data.map(tile => (
                        <GridListTile>
                            <Link component={RouterLink} color="inherit" to={'/discipline/' + tile.id}>
                                <img src="http://mcgrawwentworth.com/wp-content/themes/openmind/img/no_image.png" />
                            </Link>
                            <GridListTileBar
                                title={tile.title}
                                subtitle={<span>{tile.description}</span>}
                                actionIcon={
                                    <Link component={RouterLink} color="inherit" to={'/discipline/' + tile.id}>
                                        <IconButton className={classes.icon} aria-label="Forward" >
                                            <FastForwardIcon />
                                        </IconButton>
                                    </Link>
                                }
                            />

                        </GridListTile>

                    ))}
                </GridList>
            </div>
        );
    }
}

Disciplines.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(Disciplines));

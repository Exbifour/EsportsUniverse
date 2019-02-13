import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import LanguageToggle from './LanguageToggle'
import { withLocalize } from "react-localize-redux";
import headerTranslations from "../translations/header.json";
import { Translate } from "react-localize-redux";

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing.unit * 4,
    },
    grow: {
        flexGrow: 1,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    navigation: {
        marginRight: theme.spacing.unit * 4,
    },
});

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(headerTranslations);
    }

    state = {
        auth: true,
        anchorEl: null,
    };

    // handleChange = event => {
    //   this.setState({ auth: event.target.checked });
    // };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                {/* <FormGroup>
                <FormControlLabel
                control={
                    <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
                }
                label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup> */}
                <AppBar position="static" title='Esports Universe' >
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.navigation}>
                            <Translate id="header.title" />
                        </Typography>
                        <Link component={RouterLink} color="inherit" to='/'>
                            <Button variant="text" size='large' color="inherit" className={classes.navigation}>
                                <Translate id="header.disciplines" />
                            </Button>
                        </Link>
                        <Link component={RouterLink} color="inherit" to='/teams'>
                            <Button variant="text" size='large' color="inherit" className={classes.navigation}>
                                <Translate id="header.teams" />
                            </Button>
                        </Link>
                        <Link component={RouterLink} color="inherit" to='/games'>
                            <Button variant="text" size='large' color="inherit" className={classes.navigation}>
                                <Translate id="header.games" />
                            </Button>
                        </Link>

                        <div className={classes.grow}></div>

                        {auth && (
                            <div>
                                <Button
                                    id='menuButton'
                                    variant="text"
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle className={classes.leftIcon} />
                                    Admin
                                </Button>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <Link component={RouterLink} color="inherit" to='/disciplines/manage'>
                                        <MenuItem onClick={this.handleClose}>
                                            <Translate id="header.manageDisciplines" />
                                        </MenuItem>
                                    </Link>
                                    <Link component={RouterLink} color="inherit" to='/managePlayers'>
                                        <MenuItem onClick={this.handleClose}>
                                            <Translate id="header.managePlayers" />
                                        </MenuItem>
                                    </Link>
                                    <Link component={RouterLink} color="inherit" to='/manageTeams'>
                                        <MenuItem onClick={this.handleClose}>
                                            <Translate id="header.manageTeams" />
                                        </MenuItem>
                                    </Link>
                                    <Link component={RouterLink} color="inherit" to='/manageGames'>
                                        <MenuItem onClick={this.handleClose}>
                                            <Translate id="header.manageGames" />
                                        </MenuItem>
                                    </Link>
                                </Menu>
                            </div>
                        )}

                        <LanguageToggle />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(Header));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Redirect } from 'react-router-dom';

import { withLocalize } from "react-localize-redux";
import playersTranslations from "../../translations/players.json";
import { Translate } from "react-localize-redux";

const styles = theme => ({
    root: {
        margin: 'auto',
        maxWidth: 800,
    },
    paper: {
        width: '100%',
        height: '100%',
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    textField: {
        width: '100%',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    formControl: {
        margin: theme.spacing.unit,
        marginTop: 16,
        minWidth: 400,
    },
    button: {
        marginTop: theme.spacing.unit * 8,
    }
})

class EditPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(playersTranslations);

        this.state = {
            id: "",
            nickname: "",
            firstName: "",
            lastName: "",
            teamId: "",
            toManage: false,
            teams: []
        }

        if (this.props.editExisting === true) {
            const id = this.props.match.params.id;
            const url = "../../api/Players/" + id;
            console.log(url);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        id: data.id,
                        nickname: data.name,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        teamId: data.teamId,
                        toManage: false,
                    })
                })
                .catch(error => console.log(error));
        }

        fetch('../../api/Teams')
            .then(response => response.json())
            .then(data => {
                this.setState({ teams: data });
                console.log(this.state.disciplines)
            })
            .catch(error => console.log(error));
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    sendData = () => {
        const data = {
            nickname: this.state.nickname,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            teamId: this.state.teamId
        };
        if (data.nickname.length < 1
            || data.firstName.length < 1
            || data.lastName.length < 1
            || data.teamId === "") {
            alert("Wrong input!");
            return;
        }

        let url, method;
        if (this.props.editExisting === true) {
            url = "../../api/Players/" + this.state.id;
            method = "PUT"

            data.id = this.state.id;
        } else {
            url = "../../api/Players/";
            method = "POST"
        }

        console.log(data);
        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (text) {
                console.log('Request successful', text);
            })
            .then(() => {
                this.setState(() => ({
                    toManage: true
                }))
            })
            .catch(function (error) {
                console.log('Edit failed', error);
            })
    }

    render() {
        if (this.state.toManage === true) {
            return <Redirect to='/manage/players' />
        }
        const { classes } = this.props;
        const teams = this.state.teams;

        var titleText, buttonText;
        if (this.props.editExisting === true) {
            titleText = "edit.title"
            buttonText = "edit.save"
        } else {
            titleText = "add.title"
            buttonText = "manage.addButton"
        }

        return (
            <div className={classes.root}>
                <Grid container justify='center' direction="column" alignItems='stretch' spacing={16}>
                    <Paper className={classes.paper}>
                        <Typography variant='h5' gutterBottom>
                            <Translate id={titleText} />
                        </Typography>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="table.nickname" />}
                                className={classes.textField}
                                value={this.state.nickname}
                                onChange={this.handleChange('nickname')}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="table.firstName" />}
                                className={classes.textField}
                                value={this.state.firstName}
                                onChange={this.handleChange('firstName')}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="table.lastName" />}
                                className={classes.textField}
                                value={this.state.lastName}
                                onChange={this.handleChange('lastName')}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink>{<Translate id="table.team" />}</InputLabel>
                            <Select
                                value={this.state.teamId}
                                onChange={this.handleChange('teamId')}
                                displayEmpty
                                inputProps={{
                                    name: 'team',
                                    id: 'team',
                                }}
                            >
                                <MenuItem disabled value="">
                                    <em><Translate id="edit.selectOne" /></em>
                                </MenuItem>
                                {teams.map(team =>
                                    <MenuItem value={team.id}>{team.name + " (" + team.discipline.abbreviation + ")"}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        <Grid item xs={8} className={classes.button}>
                            <Button variant="contained" size="large" color="primary" onClick={this.sendData}>
                                <Translate id={buttonText} />
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </div >
        );
    }
}

EditPlayer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(EditPlayer));
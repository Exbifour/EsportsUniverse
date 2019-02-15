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
import gamesTranslations from "../../translations/games.json";
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

class EditGame extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(gamesTranslations);

        this.state = {
            id: "",
            disciplineId: "",
            matchedTeam1: "",
            matchedTeam2: "",
            startDateTime: new Date().toLocaleString(),
            toManage: false,
            teams: [],
            disciplines: [],
        }

        if (this.props.editExisting === true) {
            const id = this.props.match.params.id;
            const url = "../../api/Games/" + id;
            console.log(url);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        id: data.id,
                        disciplineId: data.disciplineId,
                        matchedTeam1: data.matchedTeam1,
                        matchedTeam2: data.matchedTeam2,
                        startDateTime: data.startDateTime,
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

        fetch('../../api/Disciplines')
            .then(response => response.json())
            .then(data => {
                this.setState({ disciplines: data });
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
        const dataGame = {
            disciplineId: this.state.disciplineId,
            startDateTime: this.state.startDateTime,
        };
        const dataMatchedTeam1 = {
            id: this.state.matchedTeam1,
        }

        const dataMatchedTeam2 = {
            id: this.state.matchedTeam2,
        }

        if (dataGame.disciplineId.length < 1
            || dataMatchedTeam1.id.length < 1
            || dataMatchedTeam2.id.length < 1
            || Date.parse(dataGame.startDateTime) < Date.parse(new Date())) {
            alert("Wrong input!");
            return;
        }

        let url, method;
        if (this.props.editExisting === true) {
            url = "../../api/Games/" + this.state.id;
            method = "PUT"

            dataGame.id = this.state.id;
        } else {
            url = "../../api/Games/";
            method = "POST"
        }

        console.log(dataGame);
        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataGame)
        })
            .then(function (text) {
                console.log('Request successful', text);
            })
            .then( () => {
                fetch("../../api/MatchedTeams/", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataMatchedTeam1)
                })
            })
            .then(() => {
                fetch("../../api/MatchedTeams/", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataMatchedTeam2)
                })
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
            return <Redirect to='/manage/games' />
        }
        const { classes } = this.props;
        const teams = this.state.teams;
        const disciplines = this.state.disciplines;

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
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink>{<Translate id="edit.discipline" />}</InputLabel>
                            <Select
                                value={this.state.disciplineId}
                                onChange={this.handleChange('disciplineId')}
                                displayEmpty
                                inputProps={{
                                    name: 'discipline',
                                    id: 'discipline',
                                }}
                            >
                                <MenuItem disabled value="">
                                    <Translate id="edit.selectOne" />
                                </MenuItem>
                                {disciplines.map(discipline => (
                                    <MenuItem value={discipline.id}>{discipline.title}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink>{<Translate id="edit.team1" />}</InputLabel>
                            <Select
                                value={this.state.matchedTeam1}
                                onChange={this.handleChange('matchedTeam1')}
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
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink>{<Translate id="edit.team2" />}</InputLabel>
                            <Select
                                value={this.state.matchedTeam2}
                                onChange={this.handleChange('matchedTeam2')}
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
                        <form className={classes.container} noValidate>
                            <TextField
                                id="datetime-local"
                                label="Next appointment"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
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

EditGame.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(EditGame));
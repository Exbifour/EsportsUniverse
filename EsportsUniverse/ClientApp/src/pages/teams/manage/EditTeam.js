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
import teamsTranslations from "../../translations/teams.json";
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

class EditTeam extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(teamsTranslations);

        this.state = { 
            id: "",
            name: "",
            abbrebiation: "",
            disciplineId: "",
            dateAdded: "",
            toManage: false, 
            disciplines: []
        }

        if(this.props.editExisting === true)
        {
            const id = this.props.match.params.id;
            const url = "../../api/Teams/" + id;
            console.log(url);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        id: data.id,
                        name: data.name,
                        abbrebiation: data.abbrebiation,
                        disciplineId: data.disciplineId,
                        dateAdded: data.dateAdded,
                        toManage: false,
                    })
                })
                .catch(error => console.log(error));
        }

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
        const data = {
            name: this.state.name,
            abbrebiation: this.state.abbrebiation,
            disciplineId: this.state.disciplineId,
        };
        if (data.name.length < 1 
            || data.abbrebiation.length < 1 
            || data.abbrebiation.length > 8
            || data.disciplineId == "") {
            alert("Wrong input!");
            return;
        }

        let url, method;
        if(this.props.editExisting === true) {
            url = "../../api/Teams/" + this.state.id;
            method = "PUT"

            data.id = this.state.id;
            data.dateAdded = this.state.dateAdded;
        } else {
            url = "../../api/Teams/";
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
                this.setState(() => (   {
                    toManage: true
                }))
            })
            .catch(function (error) {
                console.log('Edit failed', error);
            })
    }

    render() {
        if (this.state.toManage === true) {
            return <Redirect to='/manage/teams' />
        }
        const { classes } = this.props;
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
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="edit.name" />}
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="edit.abbreviation" />}
                                className={classes.textField}
                                value={this.state.abbrebiation}
                                onChange={this.handleChange('abbrebiation')}
                                margin="normal"
                                variant="standard"
                                helperText={<Translate id="edit.abbreviationHelper" />}
                            />
                        </Grid>
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
                                <MenuItem value="">
                                    <em>Select one</em>
                                </MenuItem>
                                {disciplines.map(discipline => (
                                    <MenuItem value={discipline.id}>{discipline.title}</MenuItem>
                                ))
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

EditTeam.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(EditTeam));
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withLocalize } from "react-localize-redux";
import teamsTranslations from "../../translations/teams.json";
import { Translate } from "react-localize-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';

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
})

class EditTeam extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(teamsTranslations);

        this.state = { team: [], toManage: false, allDisciplines: [] }

        const id = this.props.match.params.id;
        const url = "../../api/Teams/" + id;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ team: data })
                console.log(this.state.team)
            })
            .catch(error => console.log(error));

        fetch('../../api/Disciplines')
            .then(response => response.json())
            .then(data => {
                this.setState({ allDisciplines: data });
                console.log(this.state.allDisciplines)
            })
            .catch(error => console.log(error));
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    sendData = () => {
        const data = this.state.team;
        if (data.name.length < 1 || data.abbrebiation.length < 1 || data.disciplineId < 1 || data.abbrebiation.length > 8) {
            alert("Wrong input!");
            return;
        }

        let url = "../../api/Teams/" + data.id;
        let method = "PUT"

        console.log(data);
        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(function (text) {
                console.log('Request successful', text);
            })
            .then(() => {
                this.setState(() => ({
                    toManage: true
                }))
            })
            .catch(function (error) {
                console.log('Add failed', error);
            })

    }

    render() {
        if (this.state.toManage === true) {
            return <Redirect to='/manage/teams' />
        }
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify='center' direction="column" alignItems='stretch' spacing={16}>
                    <Paper className={classes.paper}>
                        <Typography variant='h5' gutterBottom>
                            <Translate id="edit.title" />
                        </Typography>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="edit.name" />}
                                className={classes.textField}
                                value={this.state.team.name}
                                onChange={this.handleChange('team.name')}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="edit.abbreviation" />}
                                className={classes.textField}
                                value={this.state.team.abbrebiation}
                                onChange={this.handleChange('team.abbrebiation')}
                                margin="normal"
                                variant="standard"
                                helperText={<Translate id="edit.abbreviationHelper" />}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="edit.discipline" />}
                                value={this.state.team.disciplineId}
                                onChange={this.handleChange('team.disciplineId')}
                                margin="normal"
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Button variant="contained" size="large" color="primary" onClick={this.sendData}>
                                <Translate id="edit.save" />
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
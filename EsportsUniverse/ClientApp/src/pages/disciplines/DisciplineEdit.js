import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withLocalize } from "react-localize-redux";
import disciplinesTranslations from "../translations/disciplines.json";
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

class DisciplineEdit extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(disciplinesTranslations);

        this.state = { discipline: [], toManage: false, }

        const id = this.props.match.params.id;
        const url = 'https://localhost:44365/api/Disciplines/' + id;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ discipline: data })
                console.log(this.state.discipline)
            })
            .catch(error => console.log(error));
        //console.log('after fetch')
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    sendData = () => {
        const data = this.state.discipline;

        if (data.title.length < 1 || data.abbreviation.length < 1 || data.maxNumberOfPlayers < 1 || data.abbreviation.length > 8) {
            alert("Wrong input!");
            return;
        }

        let url = "/api/Disciplines/" + data.id;
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
            return <Redirect to='/manageDisciplines' />
        }
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify='center' direction="column" alignItems='stretch' spacing={16}>
                    <Paper className={classes.paper}>
                        <Typography variant='headline' gutterBottom>
                            <Translate id="edit.title" />
                        </Typography>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="edit.gameTitle" />}
                                className={classes.textField}
                                value={this.state.discipline.title}
                                onChange={this.handleChange('discipline.title')}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="edit.titleAbbreviation" />}
                                className={classes.textField}
                                value={this.state.discipline.abbreviation}
                                onChange={this.handleChange('discipline.abbreviation')}
                                margin="normal"
                                variant="standard"
                                helperText={<Translate id="edit.abbreviationHelper" />}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label={<Translate id="edit.description" />}
                                multiline
                                rowsMax="4"
                                value={this.state.discipline.description}
                                onChange={this.handleChange('discipline.description')}
                                className={classes.textField}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-number"
                                label={<Translate id="edit.maxNumberOfPlayers" />}
                                value={this.state.discipline.maxNumberOfPlayers}
                                onChange={this.handleChange('discipline.maxNumberOfPlayers')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
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
        )
    }
}

DisciplineEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withLocalize(withStyles(styles)(DisciplineEdit));
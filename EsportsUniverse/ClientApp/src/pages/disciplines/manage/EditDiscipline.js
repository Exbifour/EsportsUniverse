import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withLocalize } from "react-localize-redux";
import disciplinesTranslations from "../../translations/disciplines.json";
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
    button: {
        marginTop: theme.spacing.unit * 8,
    }
})

class DisciplineEdit extends React.Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(disciplinesTranslations);

        this.state = {
            id: "",
            title: "",
            abbreviation: "",
            description: "",
            dateAdded: "",
            maxPlayersInTeam: 0,
            toManage: false, 
        }

        if(this.props.editExisting === true)
        {
            const id = this.props.match.params.id;
            const url = '../../api/Disciplines/' + id;
            console.log(url);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.setState({
                        id: data.id,
                        title: data.title,
                        abbreviation: data.abbreviation,
                        description: data.description,
                        dateAdded: data.dateAdded,
                        maxPlayersInTeam: data.maxPlayersInTeam,
                    })
                    console.log(this.state.discipline)
                })
                .catch(error => console.log(error));
        }

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    sendData = () => {
        const data = {
            title: this.state.title,
            abbreviation: this.state.abbreviation,
            maxPlayersInTeam: this.state.maxPlayersInTeam,
            description: this.state.description,
            toManage: false, 
        }

        if (data.title.length < 1
            || data.abbreviation.length < 1
            || data.maxPlayersInTeam < 1
            || data.abbreviation.length > 8) {
            alert("Wrong input!");
            return;
        }

        let url, method;
        if(this.props.editExisting === true) {
            url = "../../api/Disciplines/" + this.state.id;
            method = "PUT"

            data.id = this.state.id;
            data.dateAdded = this.state.dateAdded;
        } else {
            url = "../../api/Disciplines/";
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
            return <Redirect to='/manage/disciplines' />
        }
        const { classes } = this.props;

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
                                label={<Translate id="edit.gameTitle" />}
                                className={classes.textField}
                                value={this.state.title}
                                onChange={this.handleChange('title')}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-name"
                                label={<Translate id="edit.titleabbreviation" />}
                                className={classes.textField}
                                value={this.state.abbreviation}
                                onChange={this.handleChange('abbreviation')}
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
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                className={classes.textField}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="outlined-number"
                                label={<Translate id="edit.maxNumberOfPlayers" />}
                                value={this.state.maxPlayersInTeam}
                                onChange={this.handleChange('maxPlayersInTeam')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8} className={classes.button}>
                            <Button variant="contained" size="large" color="primary" onClick={this.sendData}>
                                <Translate id={buttonText} />
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
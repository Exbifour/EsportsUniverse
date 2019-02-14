import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: 'auto',
        maxWidth: 800,
    },
    firstRow: {
        height: 300,
    },
    secondRow: {
        height: 100,
    },
    paper: {
        width: '100%',
        height: '100%',
        padding: theme.spacing.unit,
        color: theme.palette.text.secondary,
    },
})

class Games extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          nick: '',
          message: '',
          messages: [],
          hubConnection: null,
        };
      }
    
      componentDidMount = () => {
        const nick = window.prompt('Your name:', 'John');
    
        const hubConnection = new HubConnection('api/chat');
    
        this.setState({ hubConnection, nick }, () => {
          this.state.hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
    
          this.state.hubConnection.on('sendToAll', (nick, receivedMessage) => {
            const text = `${nick}: ${receivedMessage}`;
            const messages = this.state.messages.concat([text]);
            this.setState({ messages });
          });
        });
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                    <Grid container className={classes.firstRow} justify='center' height={400} direction='row' alignItems='stretch' spacing={16}>
                        <Grid item xs={8}>
                            <Paper className={classes.paper}>
                                <Typography variant='h5' gutterBottom>
                                    You are on a Games page
                                </Typography>
                            </Paper>
                        </Grid>
                        
                    </Grid>
            </div>
        );
    }
}

Games.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Games);
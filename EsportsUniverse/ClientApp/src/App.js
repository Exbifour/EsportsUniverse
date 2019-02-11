import React from 'react';
import PropTypes from 'prop-types';
import Disciplines from './pages/disciplines/Disciplines';
import withRoot from './withRoot';
import Header from './pages/components/Header';
import Teams from './pages/teams/Teams';
import Main from './pages/components/Main'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(App);
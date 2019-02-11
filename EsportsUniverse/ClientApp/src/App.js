import React from 'react';
import PropTypes from 'prop-types';
import withRoot from './withRoot';
import Header from './pages/components/Header';
import Main from './pages/components/Main';
import { withLocalize } from "react-localize-redux";
// import globalTranslations from "./translations/global.json";
import { renderToStaticMarkup } from "react-dom/server";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.props.initialize({
      languages: [
        { name: "English", code: "en" },
        { name: "Українська", code: "ua" }
      ],
      // translation: globalTranslations,
      options: { renderToStaticMarkup }
    });
  }

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

export default withLocalize(withRoot(App));
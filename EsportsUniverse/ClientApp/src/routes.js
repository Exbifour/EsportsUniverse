import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
// import Dashboard from './components/Dashboard'
// import Wizard from './components/Wizard'
// import Cards from './components/Cards'
// import Main from './components/Main'
// import Signup from './components/Signup'
import Disciplines from './pages/Disciplines';
import Teams from './pages/Teams';
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Disciplines } />
          <Route exact path='/teams' component={ Teams } />
          {/* <Route exact path='/signup' component={ Signup } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/cards' component={ Cards } /> */}
        </Switch>
      </ScrollToTop>
    </HashRouter>
)
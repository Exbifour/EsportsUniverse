import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Disciplines from '../disciplines/Disciplines'
import Teams from '../teams/Teams'
import Games from '../games/Games'

class Main extends React.Component {

  render(){
    return (
      <main>
        <Switch>
          <Route exact path='/' component={ Disciplines }/>
          <Route exact path='/teams' component={ Teams }/>
          <Route exact path='/games' component={ Games }/>
        </Switch>
      </main>
    );
  }
}
export default Main;

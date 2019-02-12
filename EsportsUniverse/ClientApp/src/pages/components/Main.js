import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Disciplines from '../disciplines/Disciplines'
import ManageDisciplines from '../disciplines/ManageDisciplines'
import DisciplineAdd from '../disciplines/DisciplineAdd'
import DisciplineEdit from '../disciplines/DisciplineEdit'
import Teams from '../teams/Teams'
import ManageTeams from '../teams/ManageTeams'
import Games from '../games/Games'
import ManageGames from '../games/ManageGames'
import ManagePlayers from '../players/ManagePlayers'


class Main extends React.Component {
 
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Disciplines} />
                    <Route exact path='/manageDisciplines' component={ ManageDisciplines }/>
                    <Route path="/manageDisciplines/edit/:id" component={ DisciplineEdit }/>
                    <Route path='/manageDisciplines/add' component={ DisciplineAdd } />
                    <Route exact path='/teams' component={Teams} />
                    <Route exact path='/manageTeams' component={ManageTeams} />
                    <Route exact path='/games' component={ Games }/>
                    <Route exact path='/manageGames' component={ ManageGames }/>
                    <Route exact path='/managePlayers' component={ ManagePlayers }/>
                </Switch>
            </main>
        );
    }
}
export default Main;

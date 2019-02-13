import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Disciplines from '../disciplines/Disciplines'
import DisciplinePage from '../disciplines/DisciplinePage'
import ManageDisciplines from '../disciplines/ManageDisciplines'
import DisciplineAdd from '../disciplines/DisciplineAdd'
import DisciplineEdit from '../disciplines/DisciplineEdit'
import Teams from '../teams/Teams'
import TeamProfile from '../teams/TeamProfile'
import ManageTeams from '../teams/ManageTeams'
import AddTeam from '../teams/AddTeam'
import EditTeam from '../teams/EditTeam'
import Games from '../games/Games'
import ManageGames from '../games/ManageGames'
import ManagePlayers from '../players/ManagePlayers'
import Unfinished from './Unfinished'


class Main extends React.Component {
 
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={ Disciplines } />
                    
                    <Route exact path='/manageDisciplines' component={ ManageDisciplines } />
                    <Route path="/editDiscipline/:id" component={ DisciplineEdit } />
                    <Route exact path='/addDiscipline' component={DisciplineAdd} />
                    <Route path='/discipline/:id' component={DisciplinePage} />
                    <Route exact path='/teams' component={Teams} />
                    <Route path='/teamProfile/:id' component={Unfinished} />
                    <Route exact path='/manageTeams' component={ManageTeams} />
                    <Route path="/editTeam/:id" component={EditTeam} />
                    <Route exact path='/addTeam' component={AddTeam} />
                    <Route exact path='/games' component={Unfinished} />
                    <Route exact path='/manageGames' component={Unfinished} />
                    <Route exact path='/managePlayers' component={Unfinished} />
                </Switch>
            </main>
        );
    }
}
export default Main;

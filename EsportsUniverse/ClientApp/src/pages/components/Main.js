import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Disciplines from '../disciplines/Disciplines'
import DisciplinePage from '../disciplines/DisciplinePage'
import ManageDisciplines from '../disciplines/manage/ManageDisciplines'
import DisciplineAdd from '../disciplines/manage/AddDiscipline'
import DisciplineEdit from '../disciplines/manage/EditDiscipline'
import Teams from '../teams/Teams'
import TeamProfile from '../teams/TeamProfile'
import ManageTeams from '../teams/manage/ManageTeams'
import AddTeam from '../teams/manage/AddTeam'
import EditTeam from '../teams/manage/EditTeam'
import Games from '../games/Games'
import ManageGames from '../games/manage/ManageGames'
import ManagePlayers from '../players/manage/ManagePlayers'
import Unfinished from './Unfinished'


class Main extends React.Component {
 
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={ Disciplines } />
                    <Route path='/disciplines/:id' component={ DisciplinePage } />
                    <Route exact path='/manage/disciplines' component={ ManageDisciplines } />
                    <Route exact path='/manage/add/discipline' component={ DisciplineAdd } />
                    <Route path="/manage/disciplines/:id" component={ DisciplineEdit } />
                    
                    <Route exact path='/teams' component={ Teams } />
                    <Route path='/teams/:id' component={ Unfinished } />
                    <Route exact path='/manage/teams' component={ ManageTeams } />
                    <Route exact path='/manage/add/team' component={ AddTeam } />
                    <Route path="/manage/teams/:id" component={ EditTeam } />

                    <Route exact path='/games' component={ Games } />
                    <Route exact path='/manage/games' component={ Unfinished } />

                    <Route exact path='/manage/players' component={ Unfinished } />
                </Switch>
            </main>
        );
    }
}
export default Main;

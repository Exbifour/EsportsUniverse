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


class Main extends React.Component {
 
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Disciplines} />
                    <Route path='/:id' component={DisciplinePage} />
                    <Route exact path='/disciplines/manage' component={ ManageDisciplines }/>
                    <Route exact path="/disciplines/edit/:id" component={ DisciplineEdit }/>
                    <Route exact path='/disciplines/add' component={ DisciplineAdd } />
                    <Route exact path='/teams' component={Teams} />
                    <Route path='/teamProfile/:id' component={ TeamProfile } />
                    <Route exact path='/manageTeams' component={ ManageTeams } />
                    <Route rxact path="/manageTeams/edit/:id" component={ EditTeam } />
                    <Route exact path='/manageTeams/add' component={ AddTeam } />
                    <Route exact path='/games' component={ Games }/>
                    <Route exact path='/manageGames' component={ ManageGames }/>
                    <Route exact path='/managePlayers' component={ ManagePlayers }/>
                </Switch>
            </main>
        );
    }
}
export default Main;

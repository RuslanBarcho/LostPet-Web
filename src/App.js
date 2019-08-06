import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {PrivateRoute} from './helpers/PrivateRoute';
import Info from './components/info';
import SideMenu from './components/SideMenu';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import Advert from './components/Advert';
import Favorites from './components/Favorites';
import NotFound from './components/NotFound';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  onReceiveToken(newToken){
    this.setState({
      token: newToken
    });
  }

  render() {
    let token = localStorage.getItem('token');
    return (
      <Router>
      <SideMenu token = {token}>
          <Switch>
            <Route exact path="/" component={Info}/>
            <Route path='/post/:id' component={Advert}/>
            <PrivateRoute path="/profile/" component={(props) => <Profile{...props}setToken={this.onReceiveToken.bind(this)}/>}/>
            <PrivateRoute path='/create/' component={Create}/>
            <PrivateRoute path='/favorites/' component={Favorites}/>
            <Route path='/login/' render={(props) => <Login{...props}setToken={this.onReceiveToken.bind(this)}/>}/>
            <Route path='/register' component={Register}/>
            <Route component={NotFound}/>
          </Switch>
        </SideMenu>
      </Router>
    );
  }
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {PrivateRoute} from './helpers/PrivateRoute';
import Info from './components/info';
import SideMenu from './components/SideMenu';
import Profile from './components/profile';
import Login from './components/login';
import NotFound from './components/NotFound';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  getAdverts = async () => {
    let headers = {'Content-Type': 'application/json', 'Authorization':  `Bearer `};
    const apiUrl = await fetch('http://95.165.154.234:8000/adverts', {headers});
    const data = await apiUrl.json();
    console.log(data);
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
            <PrivateRoute path="/profile/" component={(props) => <Profile{...props}setToken={this.onReceiveToken.bind(this)}/>}/>
            <Route path='/login/' render={(props) => <Login{...props}setToken={this.onReceiveToken.bind(this)}/>}/>
            <Route component={NotFound} />
          </Switch>
        </SideMenu>
      </Router>
    );
  }
}

export default App;

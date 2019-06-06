import React from 'react';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.loadProfileData(localStorage.getItem('token'));
  }

  logout(){
    localStorage.removeItem('token');
    this.props.setToken('');
    this.props.history.push("/");
  }

  loadProfileData = async (token) =>{
    let headers = {'Content-Type': 'application/json', 'Authorization':  `Bearer ${token}`};
    const response = await fetch('http://localhost:8000/user', {headers});
    const data = await response.json();
    if (data.name){
      this.setState({user: data});
    }
  }

  render(){
    var hasInfo = false;
    if (this.state.user != null) hasInfo = true;
    return (
      <div class='vi-page-v2'>
        <h2>Мой профиль</h2>
        {hasInfo ?
        <div style={{marginBottom: '10px'}}>{this.state.user.name}<br/></div>
        : <div style={{marginBottom: '10px'}}><CircularProgress/><br/></div>}
        <Button variant="contained" onClick={this.logout.bind(this)}>Выйти</Button>
      </div>
    );
  }
}

export default Profile;

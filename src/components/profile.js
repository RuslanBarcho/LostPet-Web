import React from 'react';
import Button from "@material-ui/core/Button";

class Profile extends React.Component {
  constructor(props){
    super(props);
  }

  logout(){
    localStorage.removeItem('token');
    this.props.setToken('');
    this.props.history.push("/");
  }

  render(){
    return (
      <div>
        <h2>Profile</h2><br/>
        <Button variant="contained" onClick={this.logout.bind(this)}>Выйти</Button>
      </div>
    );
  }
}

export default Profile;

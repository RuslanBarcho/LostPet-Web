import React from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loadProfileData(localStorage.getItem('token'));
  }

  logout(){
    localStorage.removeItem('token');
    this.props.setToken('');
    this.props.history.push("/");
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; const name = target.name;
    this.setState({ [name]: value });
  }

  loadProfileData = async (token) =>{
    let headers = {'Content-Type': 'application/json', 'Authorization':  `Bearer ${token}`};
    const response = await fetch('http://95.165.154.234:8000/user', {headers});
    const data = await response.json();
    if (data.name){
      this.setState({user: data});
    }
  }

  render(){
    return (
      <div className='vi-page-v2'>
        <div className='vi-flex-left vi-row' style={{marginBottom:'35px'}}>
          <h1 style={{paddingLeft:'20px', paddingRight:'40px'}}>Мой профиль</h1>
          <Button variant="outlined" onClick={this.logout.bind(this)} style={{alignSelf:'center', border: 'solid 1px #B00020',color: '#B00020'}}>Выйти</Button>
        </div>
        {this.state.user ?
        <div className='vi-flex-left vi-row' style={{paddingLeft:'20px', paddingBottom:'40px'}}>
          {this.state.user.pictureURL ?
            <div className='vi-circle vi-center-crop' style={{backgroundImage: `url(${this.state.user.pictureURL})`, marginRight:'40px', marginBottom:'20px'}}></div>
            :<div className='vi-circle vi-center-crop' style={{backgroundColor: '#FCFCFC', marginRight:'40px', marginBottom:'20px'}}></div>
          }
          <div className='vi-flex-left vi-column' style={{marginRight:'20px'}}>
            <TextField name="name" autoComplete='off' label="Имя" defaultValue={this.state.user.name} variant="outlined" onChange={this.handleInputChange} style={{width:'320px', marginBottom:'40px'}}/>
            <TextField name="phone_number" autoComplete='off' label="Телефон" defaultValue={this.state.user.phone_number} variant="outlined" onChange={this.handleInputChange} style={{width:'320px', marginBottom:'40px'}}/>
            <Button className='vi-orange-button vi-large-button' variant="contained" style={{marginBottom:'25px', color:'white'}}>Сохранить</Button>
          </div>
        </div>
        : <div className="vi-100vh"><CircularProgress/></div>}
      </div>
    );
  }
}

export default Profile;

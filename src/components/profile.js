import React from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.editProfileData = this.editProfileData.bind(this);
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

  editProfileData = async () =>{
    const position = 'bottom-left';
    let headers = {'Content-Type': 'application/json', 'Authorization':  `Bearer ${localStorage.getItem('token')}`};
    var body = {
      name: this.state.name,
      phone_number: this.state.number
    };
    axios.put('http://95.165.154.234:8000/user/edit',body, {headers:headers})
    .then(response => {
      toast.notify('Данные успешно изменены!', {position});
    })
    .catch(response=> {
        toast.notify('Произошла ошибка!', {position});
    });
  }

  render(){
    return (
      <div className='vi-page-v2'>
        <div className='vi-flex-left vi-row' style={{marginBottom:'35px', justifyContent:'space-between'}}>
          <h1 style={{paddingLeft:'20px', paddingRight:'40px'}}>Мой профиль</h1>
          <Button variant="outlined" onClick={this.logout.bind(this)} style={{alignSelf:'center', border: 'solid 1px #B00020',color: '#B00020', marginRight:'40px', marginLeft:'20px'}}>Выйти</Button>
        </div>
        {this.state.user ?
        <div className='vi-flex-left vi-row' style={{paddingLeft:'20px', paddingBottom:'40px'}}>
          {this.state.user.pictureURL ?
            <div className='vi-circle vi-center-crop' style={{backgroundImage: `url(${this.state.user.pictureURL})`, marginRight:'40px', marginBottom:'20px'}}></div>
            :<div className='vi-circle vi-center-crop' style={{backgroundColor: '#FCFCFC', marginRight:'40px', marginBottom:'20px'}}></div>
          }
          <div className='vi-flex-left vi-column' style={{marginRight:'20px'}}>
            <TextField className='vi-input-default' name="name" autoComplete='off' label="Имя" defaultValue={this.state.user.name} variant="outlined" onChange={this.handleInputChange} style={{marginBottom:'40px'}}/>
            <TextField className='vi-input-default' name="phone_number" autoComplete='off' label="Телефон" defaultValue={this.state.user.phone_number} variant="outlined" onChange={this.handleInputChange} style={{marginBottom:'40px'}}/>
            <Button className='vi-orange-button vi-large-button' variant="contained" onClick={this.editProfileData} style={{marginBottom:'25px', color:'white'}}>Сохранить</Button>
          </div>
        </div>
        : <div className="vi-100vh"><CircularProgress/></div>}
      </div>
    );
  }
}

export default Profile;

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.register = this.register.bind(this);
  }

  register = async () =>{
    const position = 'bottom-left';
    let headers = {'Content-Type': 'application/json'};
    let user = {
      name: this.state.name,
      phone_number: this.state.phone_number,
      password: this.state.password
    }
    if (user.name && user.phone_number && user.password){
      if(user.password == this.state.password_confirm){
        axios.post('http://95.165.154.234:8000/user/create',user, {headers:headers})
        .then(response => {
          toast.notify('Аккаунт успешно создан!', {position});
          this.props.history.push("/login");
        })
        .catch(response=> {
            toast.notify('Произошла ошибка!', {position});
        });
      } else {
        toast.notify('Пароли не совпадают!', {position});
      }
    } else {
      toast.notify('Все поля обязательны!', {position});
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; const name = target.name;
    this.setState({ [name]: value });
  }

  render(){
    return (
      <div className='vi-page-v2'>
        <h1 style={{paddingLeft:'20px', marginBottom:'30px'}}>Регистрация</h1>
        <div className='vi-flex-left vi-row' style={{marginLeft:'20px'}}>
          <div className='vi-flex-left vi-column' style={{marginRight:'40px'}}>
            <TextField className='vi-input-default' name="name" autoComplete='off' label="Имя" variant="outlined" onChange={this.handleInputChange} style={{marginBottom:'30px'}}/>
            <TextField className='vi-input-default' name="phone_number" autoComplete='off' label="Телефон" variant="outlined" onChange={this.handleInputChange} style={{marginBottom:'30px'}}/>
          </div>
          <div className='vi-flex-left vi-column' style={{marginRight:'40px'}}>
            <TextField className='vi-input-default' name="password" autoComplete='off' label="Пароль" variant="outlined" onChange={this.handleInputChange} style={{marginBottom:'30px'}}/>
            <TextField className='vi-input-default' name="password_confirm" autoComplete='off' label="Подтвердите пароль" variant="outlined" onChange={this.handleInputChange} style={{marginBottom:'30px'}}/>
          </div>
        </div>
        <Button className='vi-orange-button vi-large-button' variant="contained" onClick={this.register} style={{marginLeft:'20px',marginBottom:'25px', color:'white'}}>Создать аккаунт</Button>
      </div>
    );
  }
}

export default Register;

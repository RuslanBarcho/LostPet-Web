import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

   login = async () => {
    let headers = {'Content-Type': 'application/json'};
    const response =  await fetch('http://95.165.154.234:8000/user/obtain-token', {method: 'POST',headers: headers,
      body: JSON.stringify({
        phone_number: this.state.phone_number,
        password: this.state.password
      })}
    );
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      this.props.history.push("/");
      this.props.setToken(data.token);
    }
  }

handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value; const name = target.name;
  this.setState({ [name]: value });
}

render(){
  return (
   <div className="vi-page-v2">
      <div className="vi-100vh">
         <div className="vi-flex vi-column">
            <div className="vi-flex-v2 vi-column">
               <div className="vi-flex-v2 vi-column">
                  <TextField name='phone_number' onChange={e=>this.handleInputChange(e)} label="Телефон"/>
               </div>
               <div className="vi-flex-v2 vi-column">
                  <TextField name='password' onChange={e=>this.handleInputChange(e)} label="Пароль" type="password" />
               </div>
            </div>
            <div className="vi-flex-v2 vi-row">
               <Button className='vi-orange-button' variant="contained" onClick={this.login} style={{color:'white', marginRight:'15px'}}>Войти</Button>
               <Link to="/register" style={{ textDecoration: 'none' }}><Button className='vi-blue-button' variant="contained" style={{color:'white'}}>Создать аккаунт</Button></Link>
            </div>
         </div>
      </div>
   </div>
  );
  }
}

export default Login;

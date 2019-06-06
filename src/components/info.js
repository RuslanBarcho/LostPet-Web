import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.getAdverts();
    this.searchAdverts = this.searchAdverts.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; const name = target.name;
    this.setState({ [name]: value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.searchAdverts();
    }
  }

  getAdverts = async () => {
    let headers = {'Content-Type': 'application/json', 'Authorization':  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiI3OTE1MTE2MjkwNSIsInVzZXJJZCI6IjVjYWJlNDgxNDM4N2NkMGNkNzI5ZGIzMSIsImlhdCI6MTU1OTU2MDY5Nn0.1g1og0SOE7bj6I7xNxNrGGdVaTz_OdWqOZ_te_mzKEs`};
    const apiUrl = await fetch('http://95.165.154.234:8000/posts', {headers});
    const data = await apiUrl.json();
    this.setState({adverts: data});
  }

  searchAdverts = async () => {
    if(this.state.searchQuery.length > 0){
      let headers = {'Content-Type': 'application/json', 'Authorization':  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiI3OTE1MTE2MjkwNSIsInVzZXJJZCI6IjVjYWJlNDgxNDM4N2NkMGNkNzI5ZGIzMSIsImlhdCI6MTU1OTU2MDY5Nn0.1g1og0SOE7bj6I7xNxNrGGdVaTz_OdWqOZ_te_mzKEs`};
      const apiUrl = await fetch(`http://95.165.154.234:8000/posts/search?q=${encodeURIComponent(this.state.searchQuery)}`, {headers});
      const data = await apiUrl.json();
      this.setState({adverts: data});
    } else {
      this.getAdverts();
    }
  }

  render(){
    return (
      <div className="vi-page-v2">
        <h1 style={{paddingLeft:'15px'}}>Все объявления</h1>
        <Paper style={{width:'400px', marginLeft:'15px'}} className='paper'>
          <IconButton className='iconButton' aria-label="Search" onClick={this.searchAdverts}>
            <SearchIcon />
          </IconButton>
          <InputBase className='input' name='searchQuery' onChange={e=>this.handleInputChange(e)} onKeyUp={e=>this.handleKeyPress(e)} placeholder="Поиск" />
        </Paper>
        {this.state.adverts ?
          <Grid container justify="left" spacing='2'>
            {this.state.adverts.map(value => (
              <div key={value._id}>
              <div style={{backgroundImage: `url(${value.pictureURL[0]})`}} className="vi-card vi-column vi-center-crop"></div>
              <p style={{marginLeft:'25px'}}>{value.advertTitle}</p>
              </div>
            ))}
            </Grid>
          : null
        }
      </div>
    );
  }
}

export default Info;

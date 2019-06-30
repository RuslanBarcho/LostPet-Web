import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import FilterView from './views/FilterView';
import Pagination from "material-ui-flat-pagination";
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const myTheme = createMuiTheme({
  palette: {
    primary: {main: '#17193D'},
    secondary: {main: '#F4AC5B'}}
});

const defaultHeaders = {'Content-Type': 'application/json'};

class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = { offset: 0 };
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

  handlePageChange(offset) {
    this.setState({ offset });
  }

  getAdverts = async () => {
    const apiUrl = await fetch('http://95.165.154.234:8000/posts', {defaultHeaders});
    const data = await apiUrl.json();
    this.setState({adverts: data.adverts, count:data.count, offset: 0,
      lastRequest: {type: 'normal', reqData: undefined}
    });
  }

  searchAdverts = async () => {
    if(this.state.searchQuery.length > 0){
      const apiUrl = await fetch(`http://95.165.154.234:8000/posts/search?q=${encodeURIComponent(this.state.searchQuery)}`, {defaultHeaders});
      const data = await apiUrl.json();
      this.setState({adverts: data.adverts, count:data.count, offset: 0,
        lastRequest: {type: 'search', reqData: this.state.searchQuery}
      });
    } else {
      this.getAdverts();
    }
  }

  filterAdverts = async (body) => {
    axios.post('http://95.165.154.234:8000/posts/filtered',body, {headers:defaultHeaders})
    .then(response => {
      this.setState({adverts: response.data.adverts, count:response.data.count, offset: 0,
        lastRequest: {type: 'filter', reqData: body}
      });
    });
  }

  render(){
    return (
      <div className="vi-page-v2">
        <div style={{paddingRight:'20px'}}>
        <h1 style={{paddingLeft:'20px'}}>Все объявления</h1>
        <Paper className='vi-search-default' style={{ marginLeft:'20px'}}>
          <IconButton className='iconButton' aria-label="Search" onClick={this.searchAdverts}>
            <SearchIcon />
          </IconButton>
          <InputBase style={{width:'80%'}} className='input' autoComplete='off' name='searchQuery' onChange={e=>this.handleInputChange(e)} onKeyUp={e=>this.handleKeyPress(e)} placeholder="Поиск" />
        </Paper>
        {this.state.adverts ?
          <div className='vi-flex-nowrap vi-row'>
          <div className='vi-flex-left vi-column' style={{width: '100%'}}>
            <Grid container>
              {this.state.adverts.map(value => (
                <div key={value._id}>
                  <Link to={`/post/${value._id}`}>
                    <div style={{backgroundImage: `url(${value.pictureURL[0]})`}} className="vi-card vi-column vi-center-crop"></div>
                  </Link>
                  <p style={{marginLeft:'25px', width:'200px'}}>{value.advertTitle}</p>
                </div>
              ))}
            </Grid>
              <MuiThemeProvider theme={myTheme}>
              <Pagination limit={50} offset={this.state.offset} total={this.state.count} size = 'large'
                onClick={(e, offset) => this.handlePageChange(offset)} style={{marginLeft:'20px', marginBottom:'20px'}}/>
              </MuiThemeProvider>
            </div>
            <FilterView filterAdverts={this.filterAdverts.bind(this)}/>
            </div>
          :
          <div className="vi-100vh">
            <div><CircularProgress/></div>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default Info;

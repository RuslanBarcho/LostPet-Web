import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import FilterView from './views/FilterView';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
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
    this.state = { hasMore: false };
    this.getAdverts = this.getAdverts.bind(this);
    this.getAdverts('normal', undefined);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; const name = target.name;
    this.setState({ [name]: value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.getAdverts('search', undefined);
    }
  }

  handlePageChange(offset) {
    this.setState({ offset });
  }

  async loadNextPage(){
    this.getAdverts(this.state.lastRequest.type, this.state.lastRequest.reqData);
  }

  getAdverts = async (type, body) => {
    var response;
    switch (type){
      case 'normal':
        response = await fetch('http://95.165.154.234:8000/posts', {defaultHeaders});
        break;
      case 'search':
        if (this.state.searchQuery.length > 0) response = await fetch(`http://95.165.154.234:8000/posts/search?q=${encodeURIComponent(this.state.searchQuery)}`, {defaultHeaders});
        else response = await fetch('http://95.165.154.234:8000/posts', {defaultHeaders});
        break;
      case 'filter':
        response = await fetch('http://95.165.154.234:8000/posts/filtered', {method: 'POST', headers: defaultHeaders, body: JSON.stringify(body)});
        break;
    }
    const data = await response.json();
    var adverts = data.adverts;
    if (this.state.adverts){
      var adverts = this.state.adverts.concat(data.adverts);
    }
    this.setState({adverts: adverts, count:data.count, hasMore: adverts.length < data.count.length,
      lastRequest: {type: type, reqData: body}
    });
  }

  render(){
    return (
      <div className="vi-page-v2">
        <div style={{paddingRight:'20px'}}>
        <h1 style={{paddingLeft:'20px'}}>Все объявления</h1>
        <Paper className='vi-search-default' style={{ marginLeft:'20px'}}>
          <IconButton className='iconButton' aria-label="Search" onClick={e => this.getAdverts('search', undefined)}>
            <SearchIcon />
          </IconButton>
          <InputBase style={{width:'80%'}} className='input' autoComplete='off' name='searchQuery' onChange={e=>this.handleInputChange(e)} onKeyUp={e=>this.handleKeyPress(e)} placeholder="Поиск" />
        </Paper>
        {this.state.adverts ?
          <div className='vi-flex-nowrap vi-row'>
          <div className='vi-flex-left vi-column' style={{width: '100%'}}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadNextPage}
            hasMore={this.state.hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}>
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
          </InfiniteScroll>
          </div>
            <FilterView getAdverts={this.getAdverts}/>
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

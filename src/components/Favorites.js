import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

class Favorites extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.getAdverts();
  }

  getAdverts = async () => {
    let headers = {'Content-Type': 'application/json', 'Authorization':  `Bearer ${localStorage.getItem('token')}`};
    let response = await fetch('http://95.165.154.234:8000/user/favs', {headers});
    let data = await response.json();
    if (data.adverts){
      this.setState({adverts: data.adverts});
    }
  }

  render(){
    return (
      <div className='vi-page-v2'>
        <h1 style={{paddingLeft:'20px'}}>Избранные</h1>
        {this.state.adverts ?
          <Grid container>
            {this.state.adverts.map(value => (
              <div key={value._id}>
                <Link to={`/post/${value._id}`}>
                  <div style={{backgroundImage: `url(${value.pictureURL[0]})`}} className="vi-card vi-column vi-center-crop"></div>
                </Link>
                <p style={{marginLeft:'25px', width:'200px'}}>{value.advertTitle}</p>
              </div>
            ))}
          </Grid> :
          <div className="vi-100vh"><CircularProgress/></div>
        }
      </div>
    )
  }
}

export default Favorites;

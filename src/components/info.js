import React from 'react';
import Grid from '@material-ui/core/Grid';

class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.getAdverts();
  }

  getAdverts = async () => {
    let headers = {'Content-Type': 'application/json', 'Authorization':  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiI3OTE1MTE2MjkwNSIsInVzZXJJZCI6IjVjYWJlNDgxNDM4N2NkMGNkNzI5ZGIzMSIsImlhdCI6MTU1OTU2MDY5Nn0.1g1og0SOE7bj6I7xNxNrGGdVaTz_OdWqOZ_te_mzKEs`};
    const apiUrl = await fetch('http://95.165.154.234:8000/adverts', {headers});
    const data = await apiUrl.json();
    this.setState({adverts: data});
  }

  render(){
    return (
      <div className="vi-page-v2">
        <h2 style={{paddingLeft:'15px'}}>Все объявления</h2>
        {this.state.adverts ?
          <Grid container justify="left" spacing='2'>
            {this.state.adverts.map(value => (
              <div>
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

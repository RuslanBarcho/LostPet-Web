import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Advert extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.getDetail(this.props.match.params.id);
  }

  getDetail = async (id) => {
    let headers = {'Content-Type': 'application/json', 'Authorization':  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiI3OTE1MTE2MjkwNSIsInVzZXJJZCI6IjVjYWJlNDgxNDM4N2NkMGNkNzI5ZGIzMSIsImlhdCI6MTU1OTU2MDY5Nn0.1g1og0SOE7bj6I7xNxNrGGdVaTz_OdWqOZ_te_mzKEs`};
    const apiUrl = await fetch(`http://95.165.154.234:8000/posts/post/${id}`, {headers});
    const data = await apiUrl.json();
    this.setState({content: data});
  }

  render(){
    return (
      <div className='vi-page-v2'>
        {this.state.content ?
          <h1 style={{paddingLeft:'20px'}}>{this.state.content.advertTitle}</h1>

          :
          <div className="vi-100vh">
            <div><CircularProgress/></div>
          </div>
        }
      </div>
    );
  }

}

export default Advert;

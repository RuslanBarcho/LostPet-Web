import React from 'react';

class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.getAdverts = this.getAdverts.bind(this);
  }

  getAdverts = async (token) => {
    let headers = {'Content-Type': 'application/json', 'Authorization':  `Bearer ${token}`};
    const apiUrl = await fetch('http://95.165.154.234:8000/adverts', {headers});
    const data = await apiUrl.json();
    this.setState({adverts: data});
  }

  render(){
    return (
      <div>
        <h2>Test</h2>
      </div>
    );
  }
}

export default Info;

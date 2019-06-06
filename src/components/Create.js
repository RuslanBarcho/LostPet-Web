import React from 'react';

class Create extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div className='vi-page-v2'>
        <h1 style={{paddingLeft:'15px'}}>Новое объявление</h1>
      </div>
    );
  }
}

export default Create;

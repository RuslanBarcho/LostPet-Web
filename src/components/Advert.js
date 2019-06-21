import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageView from './views/ImageView';
import Button from "@material-ui/core/Button";

class Advert extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.displayPhone = this.displayPhone.bind(this);
    this.getDetail(this.props.match.params.id);
  }

  getDetail = async (id) => {
    let headers = {'Content-Type': 'application/json'};
    let url = `http://95.165.154.234:8000/posts/public/post/${id}`;
    if (localStorage.getItem('token')){
      headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`};
      url = `http://95.165.154.234:8000/posts/post/${id}`
    }
    let apiUrl = await fetch(url, {headers});
    const data = await apiUrl.json();
    console.log(data);
    if (data.owner){
      this.setState({
        content: data,
        displayPhone: 'Показать телефон'
      });
    }
  }

  displayPhone = () => {
    this.setState({
      displayPhone: this.state.content.owner.phone_number
    });
  }

  render(){
    return (
      <div className='vi-page-v2'>
        {this.state.content ?
          <div>
            <h1 style={{paddingLeft:'20px'}}>{this.state.content.advertTitle}</h1>
            <div className='vi-flex-left vi-row' style={{paddingLeft:'20px', paddingBottom:'40px'}}>
              <div className='vi-flex-advert vi-column' style={{paddingRight: '40px'}}>
                <ImageView content={this.state.content.pictureURL}/>
                <div className='vi-description' style={{marginBottom:'20px'}}>{this.state.content.advertDescription}</div>
              </div>
              <div className='vi-flex-left vi-column'>
                <Button className='vi-blue-button vi-large-button' variant="contained" theme='dark' style={{marginBottom:'15px', color:'white'}} onClick={this.displayPhone}>{this.state.displayPhone}</Button>
                <Button className='vi-orange-button vi-large-button' variant="contained" style={{marginBottom:'25px', color:'white'}}>Написать</Button>
                <div className='vi-flex-left vi-row'>
                  {this.state.content.owner.pictureURL ?
                    <div className='vi-circle-small vi-center-crop' style={{backgroundImage: `url(${this.state.content.owner.pictureURL})`, marginRight:'15px'}}></div>
                    : null
                  }
                  <a style={{alignSelf: 'center'}}>{this.state.content.owner.name}</a>
                </div>
              </div>
            </div>
          </div>
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

import React from 'react';

class ImageView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selected: 0
    };
    this.setSelected = this.setSelected.bind(this);
    this.changeFull = this.changeFull.bind(this);
  }

  setSelected = (index) => {
    this.setState({
      selected: index
    });
  }

  changeFull = (active) => {
    if (active){
      this.setState({
        fullSize: this.props.content[this.state.selected]
      });
    } else {
      this.setState({
        fullSize: undefined
      });
    }
  }

  render(){
    return (
      <div>
        {this.state.fullSize ?
        <div className='vi-dim' onClick={e => this.changeFull(false)}>
          <div style={{backgroundImage: `url(${this.state.fullSize})`}}></div>
        </div>: null}
        <div style={{backgroundImage: `url(${this.props.content[this.state.selected]})`}} onClick={e => this.changeFull(true)} className="vi-card-large vi-column vi-center-crop"></div>
        <div className='vi-flex-left vi-row' style={{paddingBottom:'15px'}}>
        {this.props.content.map((value, index) => (
          <div key={index}>
            <div style={{backgroundImage: `url(${this.props.content[index]})`, marginRight: '10px', marginTop:'0px'}} onClick={e => this.setSelected(index)} className="vi-card-mini vi-center-crop"></div>
          </div>
        ))}
        </div>
      </div>
    );
  }
}

export default ImageView;

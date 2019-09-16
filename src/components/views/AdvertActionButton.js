import React from 'react';
import StarOutline from '@material-ui/icons/StarBorder';
import StarFilled from '@material-ui/icons/Star';
import Edit from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";

class AdvertActionButton extends React.Component {

  constructor(props){
    super(props);
    this.getType = this.getType.bind(this);
    this.state = {mode: this.props.mode};
  }

  getType = () => {
    switch(this.state.mode) {
      case 'edit':
        return <div className='vi-iconified-button vi-row'><Edit style={{marginRight: '5px'}} /> Редактировать </div> ;
      case 'favorite-add':
        return <div className='vi-iconified-button vi-row'><StarOutline style={{marginRight: '5px'}} /> В избранное </div>;
      case 'favorite-delete':
        return <StarFilled/>;
      default:
        return null;
      }
  }

  render(){
    return(
      <Button color="primary" onClick={this.props.doAction()}>
        {this.getType()}
      </Button>
    )
  }

}

export default AdvertActionButton;

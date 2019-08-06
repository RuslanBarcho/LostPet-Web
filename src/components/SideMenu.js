import React from 'react';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/FeaturedPlayList";
import AccountIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from '@material-ui/icons/Favorite'
import Fab from '@material-ui/core/Fab';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
        secondary: {
            main: '#FFFFFF'
        }
      },
});

class SideMenu extends React.Component {
  constructor(props){
    super(props);
  }

render(){
  return (
    <MuiThemeProvider theme={theme}>
      <div className ='flexContainer'>
      {this.props.token ?
        <div className="appSidebar">
          <div className="menuList">
            <p className='sideButton'><Link to="/create"><Fab color='secondary' aria-label="add" className="sideItem"><AddIcon /></Fab></Link></p>
            <p className='sideButton'><Link to="/"><Button aria-label="add" className="sideItem"><ListIcon /></Button></Link></p>
            <p className='sideButton'><Link to="/profile"><Button aria-label="add" className="sideItem"><AccountIcon /></Button></Link></p>
            <p className='sideButton'><Link to="/favorites"><Button aria-label="add" className='sideItem'><FavoriteIcon /></Button></Link></p>
          </div>
        </div>:
        <div className="appSidebar">
          <div className="menuList">
            <p className='sideButton'><Link to="/"><Button aria-label="add" className="sideItem"><ListIcon /></Button></Link></p>
            <p className='sideButton'><Link to="/login"><Button aria-label="add" className="sideItem"><AccountIcon /></Button></Link></p>
          </div>
        </div>}
        {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default SideMenu;

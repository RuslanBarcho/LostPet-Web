import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const myTheme = createMuiTheme({
  palette: {
    primary: {main: '#17193D'},
    secondary: {main: '#F4AC5B'}}
});

class FilterView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cat: true,
      dog: true,
      lost: true,
      found: true,
      goodHands: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; const name = target.name;
    this.setState({ [name]: value });
  }

  filter() {
    var petsFilterList = [];
    var advertFilterList = [];
    if (this.state.cat) petsFilterList.push('cat');
    if (this.state.dog) petsFilterList.push('dog');
    if (this.state.lost) advertFilterList.push('missed');
    if (this.state.found) advertFilterList.push('found');
    if (this.state.goodHands) advertFilterList.push('good-hands');
    var body = {
      animalTypes: petsFilterList,
      advertTypes: advertFilterList
    }
    this.props.getAdverts('filter',body);
  }

  render(){
    return (
      <MuiThemeProvider theme={myTheme}>
      <div className='vi-flex-left vi-column' style={{minWidth:'200px', width: '200px', paddingRight:'20px'}}>
        <FormControl component="fieldset" style={{paddingBottom:'20px'}}>
        <FormLabel component="legend">Тип животного</FormLabel>
          <FormControlLabel
            control={<Checkbox className='vi-check' checked={this.state.cat} name="cat" onChange={e => this.handleInputChange(e)}/>}
            label="Кошки"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.dog} name="dog" onChange={e => this.handleInputChange(e)}/>}
            label="Собаки"
          />
        </FormControl>
        <FormControl component="fieldset">
        <FormLabel component="legend">Тип объявления</FormLabel>
        <FormControlLabel
          control={<Checkbox checked={this.state.lost} name="lost" onChange={e => this.handleInputChange(e)}/>}
          label="Потерянные"
        />
        <FormControlLabel
          control={<Checkbox checked={this.state.found} name="found" onChange={e => this.handleInputChange(e)}/>}
          label="Найденные"
        />
        <FormControlLabel
          control={<Checkbox checked={this.state.goodHands} name="goodHands" onChange={e => this.handleInputChange(e)}/>}
          label="В хорошие руки"
        />
        </FormControl>
        <Button className='vi-blue-button' variant="contained" style={{color:'white', marginTop:'20px'}} onClick={this.filter.bind(this)}>Применить</Button>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default FilterView;

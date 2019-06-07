import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddPhotoAlternate";

class Create extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; const name = target.name;
    this.setState({ [name]: value });
  }

  fileChangedHandler = event => {
    this.setState({selectedFile: event.target.files[0]});
  }

  createAdvert = async () =>{
    let advert = {
      animalType: this.state.animalType,
      advertType: this.state.advertType,
      advertDescription: this.state.description,
      advertTitle: this.state.title
    }
    const formData = new FormData();
    formData.append('image0',this.state.selectedFile);
    formData.set('json',JSON.stringify(advert));
    axios.post('http://95.165.154.234:8000/posts/create', formData,{ headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data'}})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });
  }

  render(){
    return (
      <div className='vi-page-v2'>
        <h1 style={{paddingLeft:'20px'}}>Новое объявление</h1>
        <div className='vi-flex-left vi-row' style={{paddingLeft:'20px', paddingBottom:'40px'}}>
          <div className='vi-flex-left vi-column'>
            <TextField name="title" autoComplete='off' label="Название" placeholder="Название" variant="outlined" onChange={this.handleInputChange} style={{width:'320px', marginBottom:'20px', paddingRight:'20px'}}/>
            <TextField name="description" autoComplete='off' label="Описание" multiline rows="5" variant="outlined" onChange={this.handleInputChange} style={{width:'320px', marginBottom:'20px'}}/>
            <h3>Категории</h3>
            <div className='vi-flex-left vi-row'>
              <RadioGroup onChange={this.handleInputChange} aria-label="Тип животного" name="animalType" style={{marginRight:'30px'}}>
                <FormControlLabel value="cat" control={<Radio color="primary" />} label="Кошка" />
                <FormControlLabel value="dog" control={<Radio color="primary" />} label="Собака" />
              </RadioGroup>
              <RadioGroup onChange={this.handleInputChange} aria-label="Тип объявления" name="advertType">
                <FormControlLabel value="lost" control={<Radio color="primary" />} label="Потерян" />
                <FormControlLabel value="found" control={<Radio color="primary" />} label="Найден" />
                <FormControlLabel value="good-hands" control={<Radio color="primary" />} label="В хорошие руки" />
              </RadioGroup>
            </div>
          </div>
          <div className='vi-flex-left vi-column'>
            <input type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} onChange={this.fileChangedHandler}/>
            <Button variant="contained" onClick={(e) => this.upload.click()} style={{width:'100px', height:'100px'}}><AddIcon/></Button>
          </div>
        </div>
        <div className='vi-flex-left vi-row' style={{paddingLeft:'20px'}}>
          <Button variant="contained" onClick={this.createAdvert.bind(this)} style={{marginTop:'10px', marginRight:'10px', width:'150px'}}>Создать</Button>
          <Button variant="contained" style={{marginTop:'10px', marginRight:'10px', width:'150px'}}>Отменить</Button>
        </div>
      </div>
    );
  }
}

export default Create;

import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddPhotoAlternate";
import toast from 'toasted-notes';

class Create extends React.Component {
  constructor(props){
    super(props);
    this.state = {selectedFiles: [], fileInputDisabled: false};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; const name = target.name;
    this.setState({ [name]: value });
  }

  fileChangedHandler = event => {
    let file = {fileUrl: URL.createObjectURL(event.target.files[0]), file: event.target.files[0]};
    this.setState({selectedFiles: this.state.selectedFiles.concat(file)});
    if (this.state.selectedFiles.length == 2) this.setState({fileInputDisabled: true});
    this.upload.value = null;
  }

  removeFile = (index) => {
    let arr = this.state.selectedFiles;
    arr.splice(index, 1);
    this.setState({selectedFiles: arr, fileInputDisabled: arr.length > 2});
  }

  createAdvert = async () =>{
    const position = 'bottom-left';
    let advert = {
      animalType: this.state.animalType,
      advertType: this.state.advertType,
      advertDescription: this.state.description,
      advertTitle: this.state.title
    }
    const formData = new FormData();
    this.state.selectedFiles.map((value, index) => {
      formData.append(`image${index}`, value.file);
    });
    formData.set('json',JSON.stringify(advert));
    axios.post('http://95.165.154.234:8000/posts/create', formData,{ headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data'}})
    .then(response => {
        console.log(response);
        if (response.status === 201){
          this.props.history.push("/");
          toast.notify('Объявление отправлено на сервер. Оно появится в общем доступе через несколько минут!', {position});
        }
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
          <div className='vi-flex-left vi-column' style={{paddingRight:'20px'}}>
            <TextField className='vi-input-default' name="title" autoComplete='off' label="Название" placeholder="Название" variant="outlined" onChange={this.handleInputChange} style={{marginBottom:'20px'}}/>
            <TextField className='vi-input-default' name="description" autoComplete='off' label="Описание" multiline rows="5" variant="outlined" onChange={this.handleInputChange} style={{marginBottom:'20px'}}/>
            <h3>Категории</h3>
            <div className='vi-flex-left vi-row'>
              <RadioGroup onChange={this.handleInputChange} aria-label="Тип животного" name="animalType" style={{marginRight:'30px', marginBottom:'20px'}}>
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
          <div className='vi-flex-left vi-row'>
            <input type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} onChange={this.fileChangedHandler}/>
            <Button variant="contained" onClick={(e) => this.upload.click()} style={{width:'100px', height:'100px', marginRight:'15px'}} disabled={this.state.fileInputDisabled}><AddIcon/></Button>
              {this.state.selectedFiles.map((value, i) => (
                <div key={i}>
                  <div style={{backgroundImage: `url(${value.fileUrl})`}} className="vi-card-mini vi-center-crop">
                  <div className="vi-box">
                  <div className="vi-del-img" onClick={this.removeFile.bind(this, i)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#565656"/>
                      <path d="M12 0C18.636 0 24 5.364 24 12C24 18.636 18.636 24 12 24C5.364 24 0 18.636 0 12C0 5.364 5.364 0 12 0ZM16.308 6L12 10.308L7.692 6L6 7.692L10.308 12L6 16.308L7.692 18L12 13.692L16.308 18L18 16.308L13.692 12L18 7.692L16.308 6Z" fill="#D7D9D8"/>
                  </svg>
                  </div>
                  </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='vi-flex-left vi-row' style={{paddingLeft:'20px'}}>
          <Button className='vi-orange-button vi-large-button' variant="contained" onClick={this.createAdvert.bind(this)} style={{marginTop:'10px', marginRight:'20px', color:'white'}}>Создать</Button>
          <Button className='vi-blue-button vi-large-button' variant="contained" style={{marginTop:'10px', marginRight:'10px', color:'white'}}>Отменить</Button>
        </div>
      </div>
    );
  }
}

export default Create;

import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm';
import Navigation from './components/Navigation';
import Rank from './components/Rank';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Logo from './components/Logo'; 

class App extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      input: '',
      imageUrl: '',
      imageIsBeingProcessed: false,
      boxes: [],
      route: 'signin',
      tab: 'file',
      isSignedin: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
    this.localStorageStateKey = "state";
    this.bigSpinner = [<div key='spinner' className='spinnerWrap onTop'><img src={require('./components/spinner.png')} alt ="..." className='spinner bigger'/></div>];
    this.smallSpinner = [<div key='spinner'><img src={require('./components/spinner.png')} alt ="..." className='spinnerSmall'/></div>];
    this.imageErrorStyle = {color: '#A02C3D', fontSize: '16pt', marginBottom: '2em'};
    this.apiUrl = "https://limitless-badlands-68204.herokuapp.com/"; //production
    // this.apiUrl = "http://localhost:4000/"; //development
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
    localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state));
  }

  calculateFaceLocation = (data) => {  
    let boxesAggregator = [];
    let regionsLength = data.outputs[0].data.regions.length;
    for (let i = 0; i < regionsLength; i++) {
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('image');
      const width = Number(image.width);
      const height = Number(image.height);
      boxesAggregator.push( {
        leftCol: Math.floor(clarifaiFace.left_col * width) + 'px',
        topRow: Math.floor(clarifaiFace.top_row * height) + 'px',
        rightCol: Math.floor(width - (clarifaiFace.right_col * width)) + 'px',
        bottomRow: Math.floor(height - (clarifaiFace.bottom_row * height)) + 'px'
      })
    }
    return boxesAggregator;    
  }

  displayFaceBoxes = (boxes) => {
    let aggregator = [];
    for (let i=0; i<boxes.length; i++) {
      let newDiv = [<div key ={i} className='bounding-box' style={{top: boxes[i].topRow, right: boxes[i].rightCol, bottom: boxes[i].bottomRow, left: boxes[i].leftCol}}>  </div>];
      aggregator = aggregator.concat(newDiv);
    }
    this.setState({boxes: aggregator});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}) 
  }

  onEnterPress = (e) => {
    if (e.key === 'Enter') this.onButtonSubmit();
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  onFileChange = (event) => {
    this.setState({ boxes: [], file: event.target.files[0]}, () => {
      this.toBase64(this.state.file)
      .then(bytes => this.setState({imageUrl: bytes }));
    })
  }

  onButtonSubmit = (event) => {
    let requestData = '';
    if (this.state.tab === 'link') {
      if (this.state.input === '') return;
      requestData = this.state.input;
      this.setState({ imageUrl: this.state.input });
    }
    if (this.state.tab === 'file') {
      if (this.state.file === null) return;
      requestData = { base64: this.state.imageUrl.split("base64,")[1] };        
    }
    this.setState({ imageIsBeingProcessed: true, boxes: [] });
    fetch(this.apiUrl + "imageurl", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: requestData
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response === "Invalid image link") this.setState({ imageIsBeingProcessed: false, boxes: [<div style={this.imageErrorStyle} key='fail'>Invalid image, try another.</div>] });
      else if (response.outputs[0].data.regions == null) this.setState({ imageIsBeingProcessed: false, boxes: [<div style={this.imageErrorStyle} key='fail'><br/>No faces found on submitted image, try again.</div>] });
      else {
        this.displayFaceBoxes(this.calculateFaceLocation(response));
        fetch(this.apiUrl + "rankup", {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(data => {
          this.setState({
            imageIsBeingProcessed: false,
            user: {
              id: this.state.user.id,
              name: this.state.user.name,
              email: this.state.user.email,
              entries: data,
              joined: this.state.user.joined
            }
          })
        })
        .then(() => {localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state))})
        .catch(err => {console.log(err); this.setState({ imageIsBeingProcessed: false })})
      } 
    })
    .catch(err => {
      this.setState({ imageIsBeingProcessed:false, boxes: [<div style={this.imageErrorStyle} key='fail'>Unknown server error, try again later.</div>]})
    });
  }

  onRouteChange = (route) =>  { 
    if (route === 'signin') {
      localStorage.clear();
      this.setState({isSignedin: false})
    } else if (route === 'home') {
      this.setState({isSignedin: true})
    }
    this.setState({route: route});
    this.setState({boxes: [], imageUrl: ''});
  }
  onTabChange = (tab) => {
    this.setState( {tab: tab, imageUrl: '', boxes: [] }, () => localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state)))
  }

  componentDidMount() {
    // localStorage.clear();
    let data = localStorage.getItem(this.localStorageStateKey);
    if ((data !== null) && (typeof data !== 'undefined')) {
      let locStor = JSON.parse(data);
      if ((locStor.user !== null) && (typeof locStor.user !== 'undefined')) {
        this.setState({
          input: '',
          imageUrl: '',
          imageIsBeingProcessed: false,
          boxes: '',
          tab: locStor.tab,
          route: 'home',
          isSignedin: true,
          user: {
            id: locStor.user.id,
            name: locStor.user.name,
            email: locStor.user.email,
            entries: this.smallSpinner,
            joined: locStor.user.joined
          }
        });

        fetch(this.apiUrl + 'profile/' + locStor.user.id, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
          if (data === 'Error getting user') {
            console.log("Oops, couldn't get rank for a logged in user")
          } else {
            this.setState({
              user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
              }
            });
          }             
        })
        //.then(localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state)))
        .catch(err => console.log(err)); 
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
                  params={{
                      interactivity: {
                        onhover: {
                          enable: true,
                          mode: 'repulse'
                        }
                      }
                  }} />
        <div className = 'navig'>
          <Logo/>
          <Navigation  onRouteChange = { this.onRouteChange } isSignedin = { this.state.isSignedin } route = { this.state.route } />
        </div>
        { this.state.route === 'home'
          ? <div>
              <Rank user={ this.state.user }/>
              <ImageLinkForm
                onInputChange={ this.onInputChange }
                onButtonSubmit={ this.onButtonSubmit }
                onEnterPress={ this.onEnterPress }
                tab={ this.state.tab }
                onTabChange={ this.onTabChange }
                onFileChange={ this.onFileChange }
              />
              <FaceRecognition boxes={ this.state.boxes } imageUrl={ this.state.imageUrl } imageIsBeingProcessed = { this.state.imageIsBeingProcessed } bigSpinner = { this.bigSpinner } /> 
            </div>
          : (
              this.state.route === 'signin'
                ? <SignIn onRouteChange={ this.onRouteChange } loadUser={ this.loadUser } signInErrorMessage={this.signInErrorMessage} apiUrl={this.apiUrl}/>
                : <Register onRouteChange={ this.onRouteChange } loadUser={ this.loadUser } apiUrl={ this.apiUrl }/>
            )
        }   
      </div>
    );
  }
}

export default App;
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
      input: '',
      imageUrl: '',
      imageIsBeingProcessed: false,
      boxes: [],
      route: 'signin',
      isSignedin: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
    this.localStorageStateKey = "user";
    this.bigSpinner = [<div key='spinner' className='spinnerWrap onTop'><img src={require('./components/spinner.png')} alt ="..." className='spinner bigger'/></div>];
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
    localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state.user));
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

  onButtonSubmit = (event) => {
    if (this.state.input === '') return;
    this.setState({ imageIsBeingProcessed: true, imageUrl: this.state.input, boxes: [] });
    fetch(this.apiUrl + "imageurl", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response === "Invalid image link") this.setState({ imageIsBeingProcessed: false, boxes: [<div style={{color: '#A02C3D', fontSize: '16pt'}} key='fail'>Invalid link, try again.</div>] });
      else if (response.outputs[0].data.regions == null) this.setState({ imageIsBeingProcessed: false, boxes: [<div style={{color: '#A02C3D', fontSize: '16pt'}} key='fail'><br/>No faces found on submitted image, try again.</div>] });
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
        .then(() => {localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state.user))})
        .catch(err => {console.log(err); this.setState({ imageIsBeingProcessed: false })})
      } 
    })
    .catch(err => {
      this.setState({ imageIsBeingProcessed:false, boxes: [<div style={{color: '#C0354A', fontSize: '16pt'} } key='fail'>Unknown server error, try again later.</div>]})
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

  componentDidMount() {
    let data = localStorage.getItem(this.localStorageStateKey);


    if ((data !== null) && (typeof data !== 'undefined')) {
      let locStor = JSON.parse(data);
      this.setState({
        input: '',
        imageUrl: '',
        imageIsBeingProcessed: false,
        boxes: '',
        route: 'home',
        isSignedin: true,
        user: {
          id: locStor.id,
          name: locStor.name,
          email: locStor.email,
          entries: locStor.entries,
          joined: locStor.joined
        }
      });
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
        <Navigation onRouteChange = { this.onRouteChange } isSignedin = { this.state.isSignedin } route = { this.state.route } />
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank user={ this.state.user }/>
              <ImageLinkForm
                onInputChange={ this.onInputChange }
                onButtonSubmit={ this.onButtonSubmit }
                onEnterPress={ this.onEnterPress }
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

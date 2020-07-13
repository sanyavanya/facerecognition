import React from 'react';
import './Gallery.css';
import './spinner.css';
import {NavLink} from 'react-router-dom';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryError: '',
      pictures: [<div key='spinner' className='spinnerWrap'><img src={require('./spinner.png')} alt ="..." className='spinner'/></div>],
      galleryLoading: true
    }
    this.bigSpinner = this.props.bigSpinner;
  }

  componentDidMount () {
    //console.log(this.state.galleryLoading)
    fetch(this.props.apiUrl + "gallery", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ownerid: this.props.ownerid
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response === "Gallery is empty") this.setState( { pictures: [<div>The images you <NavLink to="/facerecognition/detect" className = "dim">process</NavLink> will be stored here.</div>] })
      else {
        let aggregator = [];
        for (let i = response.length-1; i >= 0; i--) {
          let newDiv = [<div key ={i} className=''><img src={response[i].image} alt ="..." className='galleryItem'/></div>];
          aggregator = aggregator.concat(newDiv);
        }
        this.setState({pictures: aggregator});
      }
    })
    //.then(this.setState({ galleryLoading: false }))
  }

  render() {
    return (
      <div className ='mt4'>
        <div className='white f3'>
          {`Image Gallery`}
        </div>
        <div className='galleryWrap mt4'>
        
          <div className='gallery'>
            { this.state.pictures }
          </div>

        </div>
      </div> 
    );
  }
}

export default Gallery;
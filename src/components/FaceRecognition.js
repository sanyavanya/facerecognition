import React from 'react';
import './FaceRecognition.css';
import './spinner.css';

class FaceRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxesOrSpinner: []
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.imageIsBeingProcessed) this.setState({ boxesOrSpinner: this.props.bigSpinner })
      else this.setState({ boxesOrSpinner: this.props.boxes })
    }
  }

  render() {
    return (
      <div className='center' style={{ marginTop: '50px', marginBottom: '100px' }}>
        <div className='imageWrap absolute mt2 mb2'>
          <img id='image' src={this.props.imageUrl} alt={``} style={{width: '500px', height: 'auto'}} />
          { this.state.boxesOrSpinner }
        </div>
      </div>    
    );
  }
}

export default FaceRecognition;
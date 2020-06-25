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
    if (this.props.imageIsBeingProcessed !== prevProps.imageIsBeingProcessed) {
      if (this.props.imageIsBeingProcessed) this.setState({ boxesOrSpinner: this.props.bigSpinner })
      else this.setState({ boxesOrSpinner: this.props.boxes })
    }
  }

  render() {
    return (
      <div className='center' style={{ marginTop: '50px', marginBottom: '50px' }}>
        <div className='imageWrap absolute mt2'>
          <img id='image' src={this.props.imageUrl} alt={``} style={{width: '500px', height: 'auto', marginBottom: '-4px'}} />
          { this.state.boxesOrSpinner }
        </div>
      </div>    
    );
  }
}

export default FaceRecognition;
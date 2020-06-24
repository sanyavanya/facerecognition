import React from 'react';
import './FaceRecognition.css';
import './spinner.css';

const FaceRecognition = ({ imageUrl, boxes, boxesLoading }) => {
	return (
		<div className='center' style={{ marginTop: '50px', marginBottom: '50px' }}>
			<div className='imageWrap absolute mt2'>
				<img id='image' src={imageUrl} alt={``} style={{width: '500px', height: 'auto', marginBottom: '-4px'}} />
				{ boxesLoading ? <div key='spinner' className='spinnerWrap onTop'><img src={require('./spinner.png')} alt ="..." className='spinner'/></div> : boxes }
			</div>
		</div>		
	);
}

export default FaceRecognition;
import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
	return (
		<div className='center' style={{marginTop: '50px', marginBottom: '50px'}}>
			<div className='imageWrap absolute mt2'>
				<img id='image' src={imageUrl} alt={``} style={{width: '500px', height: 'auto', marginBottom: '-4px'}}/>
				{(boxes)}
			</div>
		</div>
		
	);
}

export default FaceRecognition;
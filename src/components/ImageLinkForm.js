import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit, onEnterPress}) => {
	return (
		<div>
			<p className='f3'>
				{'This Magic Brain will detect faces in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='pa4 br4 shadow-5 form' style={{maxWidth: '1600px', width: '90%', display: 'inline'}}>
					<input onKeyDown={onEnterPress} placeholder='Paste image link here' className='br3 f4 pa2 w-70' type='text' onChange={onInputChange}/>
					<button
						className=' br3 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
		
	);
}

export default ImageLinkForm;
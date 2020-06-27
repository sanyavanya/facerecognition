import React from 'react'
import './ImageLinkForm.css'

class ImageLinkForm extends React.Component {
	constructor(props) {
		super();
		this.tabClasses = 'tab pa1 br3 bl bt br br--top bw1 linkForm'
		this.buttonClasses = 'br3 grow f4 link ph3 pv1 dib white ma2 submitButton';
	}

	render(){
		return (
			<div>
				<p className='f3'>
					{'This engine will detect faces in your pictures. Give it a try!'}
				</p>
				<div className='centered'>
					<div className='wrapper shadow-5 br3'>
						<div className='tabs center'>
							<div className='tab pa1 br3 bl bt br br--top bw1 linkForm selectDisable pointer' style={this.props.tab !== 'link' ? {borderBottom: '2px solid black'} : {}}
								onClick={() => {if (this.props.tab !== 'link') this.props.onTabChange('link')}} >
								Paste a URL
							</div>
							<div className='tab pa1 br3 bl bt br br--top bw1 fileForm selectDisable pointer' style={this.props.tab !== 'file' ? {borderBottom: '2px solid black'} : {}} 
								onClick={() => {if (this.props.tab !== 'file') this.props.onTabChange('file')}} >
								Upload a File
							</div>
						</div>
						{this.props.tab === 'link' ?
							<div className='center' >
								<div className='pa3 br3 br--bottom bl br bb bw1 linkForm form'>
									<input onKeyDown={this.props.onEnterPress} placeholder='Paste image URL here' className='br3 f4 pa1 w-70' type='text' onChange={this.props.onInputChange}/>
									<button
										className={this.buttonClasses}
										onClick={this.props.onButtonSubmit}>Detect</button>
								</div>
							</div>
							:
							<div className='center' >
		            <div className='pa3 br3 br--bottom bl br bb bw1 fileForm form'>
		              <input type="file" accept=".jpg, .jpeg, .png, .tiff, .bmp, .webp" onChange={this.props.onFileChange} />
		              <button
		                className={this.buttonClasses}
		                onClick={this.props.onButtonSubmit}>Detect
		              </button>
		            </div>
		          </div>
					}
					</div>
				</div>
			</div>			
		);
	}
}

export default ImageLinkForm;
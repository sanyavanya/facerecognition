import React from 'react'
import './ImageLinkForm.css'

class ImageLinkForm extends React.Component {
	constructor(props) {
		super();
		this.state = {
			tab: 'link'
		}
		this.tabClasses = 'tab pa1 br3 bl bt br br--top bw1 shadow-5 linkForm'
	}

	changeTab(tabname){
		this.setState({tab: tabname})
	}

	render(){
		return (
			<div>
				<p className='f3'>
					{'This engine will detect faces in your pictures. Give it a try!'}
				</p>
				<div className='tabs center'>
					<div className='tab pa1 br3 bl bt br br--top bw1 shadow-5 linkForm selectDisable pointer' style={this.state.tab !== 'link' ? {borderBottom: '2px solid black'} : {}}
						onClick={() => {if (this.state.tab !== 'link') this.changeTab('link')}} >
						Paste URL
					</div>
					<div className='tab pa1 br3 bl bt br br--top bw1 shadow-5 fileForm selectDisable pointer' style={this.state.tab !== 'file' ? {borderBottom: '2px solid black'} : {}} 
						onClick={() => {if (this.state.tab !== 'file') this.changeTab('file')}} >
						Upload File
					</div>
				</div>
				{this.state.tab === 'link' ?

					<div className='center' >
						<div className='pa3 br3 br--bottom shadow-5 bl br bb bw1 linkForm' style={{maxWidth: '1400px', width: '90%', display: 'inline'}}>
							<input onKeyDown={this.props.onEnterPress} placeholder='Paste image link here' className='br3 f4 pa2 w-70' type='text' onChange={this.props.onInputChange}/>
							<button
								className=' br3 grow f4 link ph3 pv2 dib white bg-light-purple ma2'
								onClick={this.props.onButtonSubmit}>Detect</button>
						</div>
					</div>

					:

					<div className='center' >
						<div className='pa3 br3 br--bottom shadow-5 bl br bb bw1 fileForm' style={{maxWidth: '1400px', width: '90%', display: 'inline'}}>
							<input onKeyDown={this.props.onEnterPress} placeholder='Uload a file' className='br3 f4 pa2 w-70' type='text' onChange={this.props.onInputChange}/>
							<button
								className=' br3 grow f4 link ph3 pv2 dib white bg-light-purple ma2'
								onClick={this.props.onButtonSubmit}>Detect</button>
						</div>
					</div>
			}
			</div>
			
		);
	}


}

export default ImageLinkForm;
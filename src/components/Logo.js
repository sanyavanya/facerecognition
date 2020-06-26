import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import mark from './mark.png'

const Logo = () => {
	return (
		<div className='ml5' style={{ }} >
			<Tilt className="Tilt br2 shadow-2" options={{ max: 40, reverse: true }} style={{ height: 80, width: 80 }} >
			 <div className="Tilt-inner">
        <a href="https://github.com/sanyavanya" style={{color: 'white', fontSize: "smaller"}}>
  			 	<img src={mark} alt = 'logo' width='50px' style={{paddingTop: '9px', marginBottom: '-5px'}} />
          sanyavanya
        </a>
			 </div>
			</Tilt>
		</div>
	);
}

export default Logo;
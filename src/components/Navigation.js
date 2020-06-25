import React from 'react';

const Navigation = ({ onRouteChange, isSignedin, route }) => {
	let defaultClassName = 'f3 link black mr3';
	let signInClassName = defaultClassName;
	let registerClassName = defaultClassName;
	if (route === 'signin') {
		registerClassName = defaultClassName + ' dim pointer underline';
		signInClassName = defaultClassName + ' o-30';
	}
	if (route === 'register') {
		signInClassName = defaultClassName + ' dim pointer underline';
		registerClassName = defaultClassName + ' o-30';
	}

	if (isSignedin) {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end', marginRight: '50px'}}>
					<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
				</nav>
			)
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end', marginRight: '50px'}}>
				{ route === 'signin' ? console.log('signin!!!') : console.log('notsignin')}
				<p onClick={() => onRouteChange('signin')} className={signInClassName}>Sign In</p>
				<p onClick={() => onRouteChange('register')} className={registerClassName}> Register</p>
			</nav>
		)
	}
}

export default Navigation;
import React from 'react';

const Navigation = ({ onRouteChange, isSignedin, route }) => {
	let defaultClassName = 'f3 link black ml3';
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
				<nav className='mr4' style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange('signin')} className={ defaultClassName + ' dim pointer underline' }>Sign Out</p>
				</nav>
			)
	} else {
		return (
			<nav className='mr4' style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className={ signInClassName }>Sign In</p>
				<p onClick={() => onRouteChange('register')} className={ registerClassName }> Register</p>
			</nav>
		)
	}
}

export default Navigation;
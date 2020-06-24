import React from 'react';
import './spinner.css';

class SignIn extends React.Component {
	constructor(props) {
		super();
		this.state = {
			signInEmail: '',
			signInPassword: '',
			signInError: '',
			signInLoading: false
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onEnterPress = (e) => {
		if (e.key === 'Enter') this.onSubmitSignIn();
	}

	onSubmitSignIn = () => {
		if (this.state.signInEmail === '' || this.state.signInPassword === '') {
			this.setState({ signInError: 'Both fields are required' });
			return;
		}
		this.setState({ signInLoading: true });

		fetch(this.props.apiUrl + 'signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data === 'Both fields are required' || data === 'Error logging in' || data === 'Wrong username or password') {
				this.setState({ signInError: data });
			} else {
				this.setState({ signInError: '' });
				this.props.loadUser(data);
				this.props.onRouteChange('home');
			}		
			this.setState({ signInLoading: false });		
		})
		.catch(err => this.setState({ signInError: 'Server is unavailable', signInLoading: false }));		
	}

	render() {
		const onRouteChange = this.props.onRouteChange;
		return (
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
				      {this.state.signInError !== '' ? <div style={{color: 'red'}}>{ this.state.signInError }, try again:</div>: null }
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">E-mail</label>
				        <input onChange={this.onEmailChange} onKeyDown={this.onEnterPress} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} onKeyDown={this.onEnterPress} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				      </div>
				    </fieldset>
				    <div className="buttonOrSpinner">
				      { !this.state.signInLoading ? <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"  type="submit" value="Sign in" /> : <div key='spinner' className='spinnerWrap'><img src={require('./spinner.png')} alt ="..." className='spinner'/></div> }
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick = {() => onRouteChange('register')} className = "pointer f6 link dim black db">Register</p>
				    </div>
				  </div>
				</main>
			</article>		
		);
	}
}

export default SignIn;
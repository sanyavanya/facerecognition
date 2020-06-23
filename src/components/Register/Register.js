import React from 'react';
import emailFormatChecker from 'email-format-checker';


class Register extends React.Component {
	constructor(props) {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			error: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}
	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}
	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}
	onEnterPress = (e) => {
		if (e.key === 'Enter') this.onSubmitRegister();
	}

	onSubmitRegister = () => {
		if (!emailFormatChecker({email: this.state.email, emailRepeat: this.state.email})) this.setState({error: 'wrong email format'});
		else if (this.state.password.length < 8) this.setState({error: 'short password'}); // HERE IT SHOULD ACTUALLY BE LONGER THAT 8 CHARACTERS, BUT FOR NOW IT'S 2 FOR CONVINIENCE
		else if (this.state.name.length < 3) this.setState({error: 'short name'});
		else {
			fetch(this.props.apiUrl + 'register', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					name: this.state.name,
					email: this.state.email,
					password: this.state.password
				})
			})
			.then(response => response.json())
			.then(data => {
				//console.log(data);
				if (data === "unable to register") this.setState({error: 'database off'});
				else if (data.constraint === "login_email_key") this.setState({error: 'email already used'});
				else {
					this.props.loadUser(data);
					this.props.onRouteChange('home');
				}
			})
			.catch(err => console.log('C A T C H:', err));
			};
		}
		

	render() {
		return (
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      { (this.state.error === 'email already used') ? <div style={{color: 'red'}}>A user with this email already exists.</div> : null }
				      { (this.state.error === 'short password') ? <div style={{color: 'red'}}>Password should be at least 8 characters long, try again:</div> : null }
				      { (this.state.error === 'wrong email format') ? <div style={{color: 'red'}}>Wrong email format, try again:</div> : null }
				      { (this.state.error === 'short name') ? <div style={{color: 'red'}}>Name should be at least 2 characters long, try again:</div> : null }
				      { (this.state.error === 'database off') ? <div style={{color: 'red'}}>Sorry, we couldn‘t reach our database.<br />Please contact <a href="mailto:ivanov.unn@gmail.com">Support</a>.</div> : null }
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="names">Name</label>
				        <input onChange= {this.onNameChange} onKeyDown={this.onEnterPress} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">E-mail</label>
				        <input onChange= {this.onEmailChange} onKeyDown={this.onEnterPress} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange= {this.onPasswordChange} onKeyDown={this.onEnterPress} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick={this.onSubmitRegister}

				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"  type="submit" value="Register"/>
				    </div>
				  </div>
				</main>
			</article>		
		);
	}
}


export default Register;
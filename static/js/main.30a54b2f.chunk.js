(this.webpackJsonpfacerecognitionbrain=this.webpackJsonpfacerecognitionbrain||[]).push([[0],{222:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(61),i=a.n(s),o=(a(69),a(10)),l=a(11),c=a(13),m=a(12),u=(a(70),function(e){var t=e.onRouteChange;return e.isSignedin?r.a.createElement("nav",{style:{display:"flex",justifyContent:"flex-end",marginRight:"50px"}},r.a.createElement("p",{onClick:function(){return t("signin")},className:"f3 link dim black underline pa3 pointer"},"Sign Out")):r.a.createElement("nav",{style:{display:"flex",justifyContent:"flex-end",marginRight:"50px"}},r.a.createElement("p",{onClick:function(){return t("signin")},className:"f3 link dim black underline pa3 pointer"},"Sign In"),r.a.createElement("p",{onClick:function(){return t("register")},className:"f3 link dim black underline pa3 pointer"}," Register"))}),d=(a(71),function(e){var t=e.onInputChange,a=e.onButtonSubmit,n=e.onEnterPress;return r.a.createElement("div",null,r.a.createElement("p",{className:"f3"},"This Magic Brain will detect faces in your pictures. Give it a try!"),r.a.createElement("div",{className:"center"},r.a.createElement("div",{className:"pa4 br4 shadow-5 form",style:{maxWidth:"1600px",width:"90%",display:"inline"}},r.a.createElement("input",{onKeyDown:n,placeholder:"Paste image link here",className:"br3 f4 pa2 w-70",type:"text",onChange:t}),r.a.createElement("button",{className:" br3 grow f4 link ph3 pv2 dib white bg-light-purple",onClick:a},"Detect"))))}),h=function(e){var t=e.user;return r.a.createElement("div",null,r.a.createElement("div",{className:"white f3"},"".concat(t.name,", your current rank is")),r.a.createElement("div",{className:"white f1"},t.entries))},p=(a(72),function(e){var t=e.imageUrl,a=e.boxes;return r.a.createElement("div",{className:"center",style:{marginTop:"50px",marginBottom:"50px"}},r.a.createElement("div",{className:"imageWrap absolute mt2"},r.a.createElement("img",{id:"image",src:t,alt:"",style:{width:"500px",height:"auto",marginBottom:"-4px"}}),a))}),g=a(62),b=a.n(g),f=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this)).onEmailChange=function(e){n.setState({signInEmail:e.target.value})},n.onPasswordChange=function(e){n.setState({signInPassword:e.target.value})},n.onEnterPress=function(e){"Enter"===e.key&&n.onSubmitSignIn()},n.onSubmitSignIn=function(){fetch(n.props.apiUrl+"signin",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n.state.signInEmail,password:n.state.signInPassword})}).then((function(e){return e.json()})).then((function(e){"error logging in"===e?(console.log("no user found"),n.setState({signInError:!0})):(n.setState({signInError:!1}),n.props.loadUser(e),n.props.onRouteChange("home"))}))},n.state={signInEmail:"",signInPassword:"",signInError:!1},n}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props.onRouteChange;return r.a.createElement("article",{className:"br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center"},r.a.createElement("main",{className:"pa4 black-80"},r.a.createElement("div",{className:"measure"},r.a.createElement("fieldset",{id:"sign_up",className:"ba b--transparent ph0 mh0"},r.a.createElement("legend",{className:"f2 fw6 ph0 mh0"},"Sign In"),this.state.signInError?r.a.createElement("div",{style:{color:"red"}},"Wrong username or\xa0password, try again:"):null,r.a.createElement("div",{className:"mt3"},r.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"email-address"},"E-mail"),r.a.createElement("input",{onChange:this.onEmailChange,onKeyDown:this.onEnterPress,className:"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",type:"email",name:"email-address",id:"email-address"})),r.a.createElement("div",{className:"mv3"},r.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"password"},"Password"),r.a.createElement("input",{onChange:this.onPasswordChange,onKeyDown:this.onEnterPress,className:"b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",type:"password",name:"password",id:"password"}))),r.a.createElement("div",{className:""},r.a.createElement("input",{onClick:this.onSubmitSignIn,className:"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib",type:"submit",value:"Sign in"})),r.a.createElement("div",{className:"lh-copy mt3"},r.a.createElement("p",{onClick:function(){return e("register")},className:"pointer f6 link dim black db"},"Register")))))}}]),a}(r.a.Component),E=a(63),w=a.n(E),v=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this)).onNameChange=function(e){n.setState({name:e.target.value})},n.onEmailChange=function(e){n.setState({email:e.target.value})},n.onPasswordChange=function(e){n.setState({password:e.target.value})},n.onEnterPress=function(e){"Enter"===e.key&&n.onSubmitRegister()},n.onSubmitRegister=function(){w()({email:n.state.email,emailRepeat:n.state.email})?n.state.password.length<8?n.setState({error:"short password"}):n.state.name.length<3?n.setState({error:"short name"}):fetch(n.props.apiUrl+"register",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n.state.name,email:n.state.email,password:n.state.password})}).then((function(e){return e.json()})).then((function(e){"unable to register"===e?n.setState({error:"database off"}):"login_email_key"===e.constraint?n.setState({error:"email already used"}):(n.props.loadUser(e),n.props.onRouteChange("home"))})).catch((function(e){return console.log("C A T C H:",e)})):n.setState({error:"wrong email format"})},n.state={name:"",email:"",password:"",error:""},n}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("article",{className:"br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center"},r.a.createElement("main",{className:"pa4 black-80"},r.a.createElement("div",{className:"measure"},r.a.createElement("fieldset",{id:"sign_up",className:"ba b--transparent ph0 mh0"},r.a.createElement("legend",{className:"f2 fw6 ph0 mh0"},"Register"),"email already used"===this.state.error?r.a.createElement("div",{style:{color:"red"}},"A user with this email already exists."):null,"short password"===this.state.error?r.a.createElement("div",{style:{color:"red"}},"Password should be at\xa0least 8\xa0characters long, try\xa0again:"):null,"wrong email format"===this.state.error?r.a.createElement("div",{style:{color:"red"}},"Wrong email format, try\xa0again:"):null,"short name"===this.state.error?r.a.createElement("div",{style:{color:"red"}},"Name should be at least 2 characters long, try\xa0again:"):null,"database off"===this.state.error?r.a.createElement("div",{style:{color:"red"}},"Sorry, we couldn\u2018t reach our\xa0database.",r.a.createElement("br",null),"Please contact ",r.a.createElement("a",{href:"mailto:ivanov.unn@gmail.com"},"Support"),"."):null,r.a.createElement("div",{className:"mt3"},r.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"names"},"Name"),r.a.createElement("input",{onChange:this.onNameChange,onKeyDown:this.onEnterPress,className:"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",type:"text",name:"name",id:"name"})),r.a.createElement("div",{className:"mt3"},r.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"email-address"},"E-mail"),r.a.createElement("input",{onChange:this.onEmailChange,onKeyDown:this.onEnterPress,className:"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",type:"email",name:"email-address",id:"email-address"})),r.a.createElement("div",{className:"mv3"},r.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"password"},"Password"),r.a.createElement("input",{onChange:this.onPasswordChange,onKeyDown:this.onEnterPress,className:"b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",type:"password",name:"password",id:"password"}))),r.a.createElement("div",{className:""},r.a.createElement("input",{onClick:this.onSubmitRegister,className:"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib",type:"submit",value:"Register"})))))}}]),a}(r.a.Component),y=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).loadUser=function(t){e.setState({user:{id:t.id,name:t.name,email:t.email,entries:t.entries,joined:t.joined}})},e.calculateFaceLocation=function(e){for(var t=[],a=e.outputs[0].data.regions.length,n=0;n<a;n++){var r=e.outputs[0].data.regions[n].region_info.bounding_box,s=document.getElementById("image"),i=Number(s.width),o=Number(s.height);t.push({leftCol:Math.floor(r.left_col*i)+"px",topRow:Math.floor(r.top_row*o)+"px",rightCol:Math.floor(i-r.right_col*i)+"px",bottomRow:Math.floor(o-r.bottom_row*o)+"px"})}return t},e.displayFaceBoxes=function(t){for(var a=[],n=0;n<t.length;n++){var s=[r.a.createElement("div",{key:n,className:"bounding-box",style:{top:t[n].topRow,right:t[n].rightCol,bottom:t[n].bottomRow,left:t[n].leftCol}},"  ")];a=a.concat(s)}e.setState({boxes:a})},e.onInputChange=function(t){e.setState({input:t.target.value})},e.onEnterPress=function(t){"Enter"===t.key&&e.onButtonSubmit()},e.onButtonSubmit=function(t){e.setState({boxes:[]}),e.setState({imageUrl:e.state.input}),fetch(e.apiUrl+"imageurl",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({input:e.state.input})}).then((function(e){return e.json()})).then((function(t){null==t.outputs[0].data.regions?e.setState({boxes:[r.a.createElement("div",{style:{color:"red",fontSize:"16pt"},key:"fail"},r.a.createElement("br",null),"No faces found on submitted image, try again.")]}):(e.displayFaceBoxes(e.calculateFaceLocation(t)),fetch(e.apiUrl+"rankup",{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e.state.user.id})}).then((function(e){return e.json()})).then((function(t){e.setState({user:{id:e.state.user.id,name:e.state.user.name,email:e.state.user.email,entries:t,joined:e.state.user.joined}})})).catch(console.log))})).catch((function(t){e.setState({boxes:[r.a.createElement("div",{style:{color:"red",fontSize:"16pt"},key:"fail"},"Invalid link, try again.")]})}))},e.onRouteChange=function(t){"signin"===t?e.setState({isSignedin:!1}):"home"===t&&e.setState({isSignedin:!0}),e.setState({route:t}),e.setState({boxes:[],imageUrl:""})},e.state={input:"",imageUrl:"",boxes:[],route:"signin",isSignedin:!1,user:{id:"",name:"",email:"",entries:0,joined:""}},e.apiUrl="https://limitless-badlands-68204.herokuapp.com/",e}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(b.a,{className:"particles",params:{interactivity:{onhover:{enable:!0,mode:"repulse"}}}}),r.a.createElement(u,{onRouteChange:this.onRouteChange,isSignedin:this.state.isSignedin}),"home"===this.state.route?r.a.createElement("div",null,r.a.createElement(h,{user:this.state.user}),r.a.createElement(d,{onInputChange:this.onInputChange,onButtonSubmit:this.onButtonSubmit,onEnterPress:this.onEnterPress}),r.a.createElement(p,{boxes:this.state.boxes,imageUrl:this.state.imageUrl})):"signin"===this.state.route?r.a.createElement(f,{onRouteChange:this.onRouteChange,loadUser:this.loadUser,signInErrorMessage:this.signInErrorMessage,apiUrl:this.apiUrl}):r.a.createElement(v,{onRouteChange:this.onRouteChange,loadUser:this.loadUser,apiUrl:this.apiUrl}))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(221);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},64:function(e,t,a){e.exports=a(222)},69:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){}},[[64,1,2]]]);
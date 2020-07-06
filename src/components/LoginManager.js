class LoginManager {
  constructor() {
    this.signedIn = false;
  }
  isSignedin() {
    return this.signedIn;
  }
  signIn() {
    this.signedIn = true;
  }
  signOut() {
    this.signedIn = false;
  }
}

const FaceRecLoginManager = new LoginManager();

export default FaceRecLoginManager;
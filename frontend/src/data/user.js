class User {
  static instance = new User("");
  token;

  constructor(token) {
    this.token = token;
  }

}

export default User;
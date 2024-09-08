class User {
  static instance = new User("");
  token;
  email;
  name;
  phone;
  address;

  constructor(token) {
    this.token = token;
  }

  setData(data) {
    if (data.name) this.name = data.name;
    if (data.email) this.email = data.email;
    if (data.phone) this.phone = data.phone;
    if (data.address) this.address = data.address;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  getToken() {
    this.token = localStorage.getItem("token");
    return this.token
  }

  async fetchData() {
    const response = await fetch("http://localhost:3001/api/auth/user", {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    const data = await response.json();
    this.setData(data);
  }

  async changePassword(oldPassword, newPassword) {
    const response = await fetch("http://localhost:3001/api/auth/changepassword", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ 'newPassword': newPassword, 'oldPassword': oldPassword }),
    });

    return response.status < 400;
  }

  async updateData(data) {
    this.name = data.name
    this.phone = data.phone
    this.address = data.address

    const response = await fetch("http://localhost:3001/api/auth/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.name,
        phone: this.phone,
        address: this.address
      }),
    });

    return response.status < 400;
  }

}

export default User;
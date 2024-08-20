class Cart {
  items = []

  constructor() {
    if (!Cart.instance) {
      this.items = [];
      Cart.instance = this;
    }
    return Cart.instance;
  }

  addCake(cake) {
    const existingCake = this.items.find(item => item.name === cake.name);
    if (existingCake) {
      existingCake.quantity += 1;
    } else {
      this.items.push({ ...cake, quantity: 1 });
    }
  }

  removeCake(cakeName) {
    this.items = this.items.filter(item => item.name !== cakeName);
  }

  changeCakeQuantity(cakeName, quantity) {
    const cake = this.items.find(item => item.name === cakeName);
    if (cake) {
      cake.quantity = quantity;
    }
  }

  getItems() {
    return this.items;
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + Number(item.price.substring(4)) * item.quantity, 0);
  }
}

const instance = new Cart()

export default instance;

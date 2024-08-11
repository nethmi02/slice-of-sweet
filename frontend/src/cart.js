class Cart {
  constructor() {
    if (!Cart.instance) {
      this.items = [];
      Cart.instance = this;
    }
    return Cart.instance;
  }

  addCake(cake) {
    const existingCake = this.items.find(item => item.id === cake.id);
    if (existingCake) {
      existingCake.quantity += 1;
    } else {
      this.items.push({ ...cake, quantity: 1 });
    }
  }

  removeCake(cakeId) {
    this.items = this.items.filter(item => item.id !== cakeId);
  }

  changeCakeQuantity(cakeId, quantity) {
    const cake = this.items.find(item => item.id === cakeId);
    if (cake) {
      cake.quantity = quantity;
    }
  }

  getItems() {
    return this.items;
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}

const instance = new Cart();
Object.freeze(instance);

export default instance;

$(document).ready(function () {
    //menu 

    const menu = $(".menu");

    $(".hamburger").click(function () {
        menu.show(500);
    });

    $("#btnMenuClose").click(function () {
        menu.hide(500);
    });

    $(".btnCart").click(function () {
        $(".cart").toggleClass("hidden");
    });

});
const productDOM = document.querySelector("#allProducts");
const productsInCart = document.querySelector(".productsInCart");



const totalInCart = document.querySelector(".totalInCart");
const clearCartBtn = document.querySelector(".clearCart");
const cartCount = document.querySelector(".cartCount");


let cart = [];
let buttonDOM = [];

class UI {

    renderProducts(products) {
        let result = ""
        products.forEach((product) => {
            result += `
						<div class="col card" style="width: 40vh;">
                            <a><img src=${product.image} class="card-img-top"></a>
                            <div class="card-body">
                                <h5 class="card-title title">${product.title}</h5>
                                <p class="card-text price">$${product.price}</p>
                                <button class="btn btn-primary btnAddToCart" data-id=${product.id} href="#"><img src="./assets/images/icon-cart.svg" alt="icon cart">Add to cart</button>
                            </div>
                        </div>
				`
        });
        productDOM.innerHTML = result
    }

    getButtons() {
        const buttons = [...document.querySelectorAll(".btnAddToCart")];
        buttonDOM = buttons;
        buttons.forEach((button) => {
            const id = button.dataset.id;
            const inCart = cart.find(item => item.id === parseInt(id, 10));

            if (inCart) {
                button.innerHTML = 'In cart';
                button.disabled = true;
            }

            button.addEventListener("click", e => {
                e.preventDefault();
                e.target.innerHTML = "In cart";
                e.target.disabled = true;

                // GET productos al carrito
                const cartITem = { ...Storage.getProducts(id), quantity: 1 }

                //agregamos el producto al carrito
                cart = [...cart, cartITem]

                //Guardamos el carrito al localstorage
                Storage.saveCart(cart)

                //Set cart values
                this.setItemValues(cart)
                this.addCartItem(cartITem)
                //Show al carrito
            })
        })
    }


    setItemValues(cart) {
        let tempTotal = 0;
        let itemTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.quantity;
            itemTotal += item.quantity;
        });
        totalInCart.innerText = parseFloat(tempTotal.toFixed(2));
        cartCount.innerText = itemTotal;

    }

    addCartItem({ image, price, title, id }) {
        const div = document.createElement("div");

        div.innerHTML = `
					<div class="item">
                        <img class="productImg" src=${image} alt=${title}>
                        <div class="details">
                            <div class="productName">${title}</div>
                            <div class="priceGroup">
                                <div class="price">${price}</div> x
                                <div class="cartCounter">
                                    <a class="decrease btnArrowMinus" data-id=${id}>-</a>
                                    <span class="itemQuantity">1</span>
                                    <a class="increase btnArrowPlus" data-id=${id}>+</a>
                                </div>
                            </div>
                            
                        </div>
                        <a href="#" class="removeProduct" data-id=${id}><img class="btnDelete" src="./assets/images/icon-delete.svg"</a>
                    </div>
		`
        productsInCart.appendChild(div);
    }

    setAPP() {
        cart = Storage.getCart();
        this.setItemValues(cart);
        this.populate(cart);
    }

    populate(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    cartLogic() {
        clearCartBtn.addEventListener("click", () => {
            this.clearCart();
        });

        productsInCart.addEventListener("click", e => {
            const target = e.target.closest("a");
            const targetElement = target.classList.contains("removeProduct");
            console.log(target);
            console.log(targetElement);
            if (!target) return
            if (targetElement) {
                const id = parseInt(target.dataset.id);
                this.removeItem(id)
                productsInCart.removeChild(target.parentElement.parentElement);
            } else if (target.classList.contains("increase")) {
                const id = parseInt(target.dataset.id, 10);
                let tempItem = cart.find(item => item.id === id);
                tempItem.quantity++;
                Storage.saveCart(cart)
                this.setItemValues(cart)
                target.previousElementSibling.innerText = tempItem.quantity;
            } else if (target.classList.contains("decrease")) {
                const id = parseInt(target.dataset.id, 10);
                let tempItem = cart.find(item => item.id === id);
                tempItem.quantity--;

                if (tempItem.quantity > 0) {
                    Storage.saveCart(cart);
                    this.setItemValues(cart);
                    target.nextElementSibling.innerText = tempItem.quantity;
                } else {
                    this.removeItem(id);
                    productsInCart.removeChild(target.parentElement.parentElement);
                }
            }
        });
    }
    clearCart() {
        const cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));

        while (productsInCart.children.length > 0) {
            productsInCart.removeChild(productsInCart.children[0]);
        }
    }
    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setItemValues(cart)
        Storage.saveCart(cart)
        let button = this.singleButton(id);
        if (button) {
            button.disabled = false;
            button.innerHTML = '<img src="./assets/images/icon-cart.svg" alt="icon cart">Add to cart'
        }
    }
    singleButton(id) {
        return buttonDOM.find(button => parseInt(button.dataset.id) === id);
    }
}



class Storage {
    static saveProduct(obj) {
        localStorage.setItem("products", JSON.stringify(obj));
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getProducts(id) {
        const product = JSON.parse(localStorage.getItem("products"));
        return product.find(product => product.id === parseFloat(id, 10));
    }
    static getCart() {
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    }
}

class Products {
    async getProducts() {
        try {
            const result = await fetch("./json/products.json");
            const data = await result.json();
            const products = data.items;
            return products;
        } catch (err) {
            console.log(err);
        }
    }
}

let category = "";
let products = [];

function categoryValue() {
    const ui = new UI();

    category = document.getElementById("category").value;
    if (category.length > 0) {
        const product = products.filter(show => show.category === category);
        ui.renderProducts(product);
        ui.getButtons();
    } else {
        ui.renderProducts(products);
        ui.getButtons();

    }
}

const query = new URLSearchParams(window.location.search);
let id = query.get('id');

document.addEventListener("DOMContentLoaded", async () => {
    const productsList = new Products();
    const ui = new UI();

    ui.setAPP();

    products = await productsList.getProducts();
    if (id) {

        Storage.saveProduct(products);
        ui.getButtons();
        ui.cartLogic();
    } else {
        ui.renderProducts(products);
        Storage.saveProduct(products);
        ui.getButtons();
        ui.cartLogic();
    }
});


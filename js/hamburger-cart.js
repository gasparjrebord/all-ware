//menu hamburger
const menu = document.querySelector('.menu');
const btnHamburger = document.querySelector('.hamburger');
const btnMenuClose = document.querySelector('#btnMenuClose');


btnHamburger.addEventListener('click', onHamburgerClick);
btnMenuClose.addEventListener('click', onBtnMenuCloseClick);

function onHamburgerClick() {
    menu.classList.remove('hidden');
}

function onBtnMenuCloseClick() {
    menu.classList.add('hidden');
}


//cart

const cart = document.querySelector('.cart');
const btnCart = document.querySelector('.btnCart');

const btnAddToCard = document.querySelector('.btn');
const cartCount = document.querySelector('.cartCount');
const productInShoppingCart = document.querySelector('.productsInCart');

const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const productCounter = document.querySelector('.counter');

const msgEmpty = document.querySelector('.msgEmpty');
const checkout = document.querySelector('.checkout');

let productCounterValue = 0;
let productsInCart = 0;

let price = 239999.0;
let discount = 0.5;


cargarEventListeners();
function cargarEventListeners() {

    btnCart.addEventListener('click', openCart);

    btnPlus.addEventListener('click', productCounterPlus);
    btnMinus.addEventListener('click', productCounterMinus);

    btnAddToCard.addEventListener('click', addToCart);

    // Muestra los cursos de Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        productsInCart = JSON.parse(localStorage.getItem('cartCount'));

        addToCart();
    })
}




function openCart() {
    cart.classList.toggle('hidden');
}

function productCounterPlus() {
    console.log(productCounterValue);
    setProductCounter(1);
}

function productCounterMinus() {
    setProductCounter(-1);
}

function setProductCounter(value) {
    if ((productCounterValue + value) > 0) {
        productCounterValue += value;
        productCounter.innerHTML = productCounterValue;
    }
    console.log(value);
}

function addToCart() {
    productsInCart += productCounterValue;

    const productHTMLElement = `
    <div class="item">
        <img class="productImg" src="../assets/images/image-product-1.jpg" alt="product 1 thumb">
        <div class="details">
            <div class="productName">Notebook ZenBook UX482...</div>
            <div class="priceGroup">
                <div class="price">$${(price * discount).toFixed(2)}</div> x
                <div class="count">${productsInCart}</div>
                <div class="totalAmount">$${(price * discount * productsInCart).toFixed(2)}</div>
        </div>
        </div>
        <img id="btnDelete" src="../assets/images/icon-delete.svg" alt="icon delete">
    </div>
    `;

    productInShoppingCart.innerHTML = productHTMLElement;


    const btnDelete = document.querySelector('#btnDelete');
    btnDelete.addEventListener('click', onBtnDeleteClick);
    console.log(productsInCart);

    updateCart();
}

function updateCart() {
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutButton();
    updateStorage();
}

function updateCartIcon() {
    cartCount.textContent = productsInCart;
    if ((productsInCart == 0) && (!cartCount.classList.contains('hidden'))) {
        cartCount.classList.add('hidden');
    } else {
        cartCount.classList.remove('hidden');
    }
}

function updateMsgEmpty() {
    if ((productsInCart == 0) && (msgEmpty.classList.contains('hidden'))) {
        msgEmpty.classList.remove('hidden');
    } else {
        if (!msgEmpty.classList.contains('hidden')) {
            msgEmpty.classList.add('hidden');
        }
    }

}

function updateCheckoutButton() {
    if ((productsInCart == 0) && (!checkout.classList.contains('hidden'))) {
        checkout.classList.add('hidden');
    } else {
        checkout.classList.remove('hidden');
    }
}

function onBtnDeleteClick() {
    productsInCart--;
    updateCart();
    const el = document.querySelector('.count');
    const totalAmount = document.querySelector('.totalAmount');
    el.innerHTML = productsInCart;
    totalAmount.innerHTML = `$${(price * discount * productsInCart).toFixed(2)}`;

    if (productsInCart == 0) {
        productInShoppingCart.innerHTML = '';
    }
}


function updateStorage() {
    localStorage.setItem('cartCount', JSON.stringify(productsInCart));
}









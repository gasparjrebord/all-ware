/**
 * @challenge: Desafío: Arrays
 * 
 * @version: v1.0.0
 * @author:
*/
class Author {
    constructor(firstName, lastName, age, location) {
        this.Nombre = firstName;
        this.Apellido = lastName;
        this.Edad = age;
        this.Localidad = location;
    }
}

let gaspar = new Author("Gaspar", "Rebord", 19, "Argentina");
console.log(gaspar);
/** 
 * @fecha: 07/12/2021
 *
 * History:
 *  - v1.0.0 – Primera entrega
*/

// User register


class Getid {
    constructor(firstName, lastName, age, date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.date = date;
    }
    getIdInfo() {
        return "El usuario se llama " + this.firstName + " " + this.lastName + ", tiene " + this.age + " años de edad y nacio el " + this.date;
    }
}

let firstName = prompt("Ingrese su nombre");
let lastName = prompt("Ingrese su apellido");
let age = prompt("Ingrese su edad");
let date = prompt("Ingrese su fecha de nacimiento");

let user = new Getid(firstName, lastName, age, date);
console.log(user);
console.log(user.getIdInfo());

//Const

const menu = document.querySelector('.menu');
const btnHamburger = document.querySelector('.hamburger');
const btnMenuClose = document.querySelector('#btnMenuClose');

const cart = document.querySelector('.cart');
const btnCart = document.querySelector('.btnCart');

const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const productCounter = document.querySelector('.counter');

const gallery = document.querySelectorAll('.pic');
const heroImg = document.querySelector('.productHero');

const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.previous');

const btnAddToCard = document.querySelector('.btn');
const cartCount = document.querySelector('.cartCount');
const productInShoppingCart = document.querySelector('.productsInCart');

const msgEmpty = document.querySelector('.msgEmpty');
const checkout = document.querySelector('.checkout');

const overlay = document.querySelector('.overlay');
const lightbox = document.querySelector('.lightbox');



let lightboxGallery;
let lightboxHero;


//Numerical Variables
let productCounterValue = 1;
let productsInCart = 0;
let price = 239999.0;
let discount = 0.5;



btnHamburger.addEventListener('click', onHamburgerClick);
btnMenuClose.addEventListener('click', onBtnMenuCloseClick);

btnCart.addEventListener('click', openCart);

btnPlus.addEventListener('click', productCounterPlus);
btnMinus.addEventListener('click', productCounterMinus);

gallery.forEach(img => {
    img.addEventListener('click', onThumbClick);
});

btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);

btnAddToCard.addEventListener('click', addToCart);

heroImg.addEventListener('click', onHeroImgClick);


function onHamburgerClick() {
    menu.classList.remove('hidden');
}

function onBtnMenuCloseClick() {
    menu.classList.add('hidden');
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


function onThumbClick(event) {
    gallery.forEach(img => {
        img.classList.remove('active');
    });

    event.target.parentElement.classList.add('active');

    heroImg.src = event.target.src.replace('thumb-', '');
}

function handleBtnClickNext() {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

function handleBtnClickPrevious() {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
}

function getCurrentImageIndex() {
    const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setHeroImage(imageIndex) {
    heroImg.src = `./assets/images/image-product-${imageIndex}.jpg`;

    gallery.forEach(img => {
        img.classList.remove('active');
    });

    gallery[imageIndex - 1].classList.add('active');
}

function addToCart() {
    productsInCart += productCounterValue;

    const productHTMLElement = `
    <div class="item">
        <img class="productImg" src="./assets/images/image-product-1.jpg" alt="product 1 thumb">
        <div class="details">
            <div class="productName">Notebook ZenBook UX482...</div>
            <div class="priceGroup">
                <div class="price">$${(price * discount).toFixed(2)}</div> x
                <div class="count">${productsInCart}</div>
                <div class="totalAmount">$${(price * discount * productsInCart).toFixed(2)}</div>
        </div>
        </div>
        <img id="btnDelete" src="./assets/images/icon-delete.svg" alt="icon delete">
    </div>
    `;

    productInShoppingCart.innerHTML = productHTMLElement;

    updateCart();

    const btnDelete = document.querySelector('#btnDelete');
    btnDelete.addEventListener('click', onBtnDeleteClick);
    console.log(productsInCart);
}

function updateCart() {
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutButton();
}

function updateCartIcon() {
    cartCount.textContent = productsInCart;
    if (productsInCart == 0) {
        if (!cartCount.classList.contains('hidden')) {
            cartCount.classList.add('hidden');
        }
    } else {
        cartCount.classList.remove('hidden');
    }
}

function updateMsgEmpty() {
    if (productsInCart == 0) {
        if (msgEmpty.classList.contains('hidden')) {
            msgEmpty.classList.remove('hidden');
        }
    } else {
        if (!msgEmpty.classList.contains('hidden')) {
            msgEmpty.classList.add('hidden');
        }
    }

}

function updateCheckoutButton() {
    if (productsInCart == 0) {
        if (!checkout.classList.contains('hidden')) {
            checkout.classList.add('hidden');
        }
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

function onHeroImgClick() {
    if (window.innerWidth >= 1440) {
        if (overlay.childElementCount == 1) {
            const newNode = lightbox.cloneNode(true);
            overlay.appendChild(newNode);

            const btnOverlayClose = document.querySelector('#btnOverlayClose');
            btnOverlayClose.addEventListener('click', onBtnOverlayClose);

            lightboxGallery = overlay.querySelectorAll('.pic');
            lightboxHero = overlay.querySelector('.productHero');
            lightboxGallery.forEach(img => {
                img.addEventListener('click', onThumbClickLightbox);
            });

            const btnOverlayNext = overlay.querySelector('.next');
            const btnOverlayPrevious = overlay.querySelector('.previous');
            btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay);
            btnOverlayPrevious.addEventListener('click', handleBtnClickPreviousOverlay);
        }
        overlay.classList.remove('hidden');
    }
}

function onBtnOverlayClose() {
    overlay.classList.add('hidden');
}

function onThumbClickLightbox(event) {
    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    event.target.parentElement.classList.add('active');
    lightboxHero.src = event.target.src.replace('image-product-', '');
}


function handleBtnClickNextOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setOverlayHeroImage(imageIndex);
}

function handleBtnClickPreviousOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setOverlayHeroImage(imageIndex);
}

function getOverlayCurrentImageIndex() {
    const imageIndex = parseInt(lightboxHero.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setOverlayHeroImage(imageIndex) {
    lightboxHero.src = `./assets/images/image-product-${imageIndex}.jpg`;

    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });

    lightboxGallery[imageIndex - 1].classList.add('active');
}
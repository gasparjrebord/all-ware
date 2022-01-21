$(document).ready(function () {
    //menu hamburger

    const menu = $(".menu");

    $(".hamburger").click(function (e) {
        menu.show(500);;
    });

    $("#btnMenuClose").click(function (e) {
        menu.hide(500);
    });

    //productos

    const JSON = "json/products.json"


    $.ajax({
        type: "GET",
        url: JSON,
        success: function (response) {
            let products = response
            for (const product of products) {
                $(".productsContainer").append(`   
                        <div class="col card" style="width: 40vh;">
                            <img src="${product.img}" class="card-img-top" id=${product.id} alt="product${product.id}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">$${product.price}</p>
                                <a class="btn btn-primary" nro=${product.id}><img src="./assets/images/icon-cart.svg" alt="icon cart">Add to cart</a>
                            </div>
                        </div>
                `);

            }

        }
    });

    $(`id=${product.id}`).click(function (e) {


    });
    $.ajax({
        type: "GET",
        url: JSON,
        success: function (response) {
            $(".lightbox").append(`
                                <div class="card mb-3 content">
                                    <div class="closeBtn">X</div>
                                    <img src="this."
                                        class="card-img-top productHero" alt="imageproduct">
                                    <div class="card-body">
                                        <p class="companyName">ALLWARE</p>
                                        <h5 class="card-title">Notebook Asus Zenbook Duo Intel Core I5 11va 16GB 512GB</h5>
                                        <p class="card-text price">$119999.50</p>
                                        <div class="countBtnGroup">
                                            <div class="counterWrapper">
                                                <div id="btnMinus">-</div>
                                                <div class="counter">1</div>
                                                <div id="btnPlus">+</div>
                                            </div>
                                            <div class="btn">
                                                <img src="./assets/images/icon-cart.svg" alt="icon cart">
                                                <p>Add to cart</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `);

        }
    });

    //cart


    let productCounterValue = 0;
    let productsInCart = 0;

    let price = 239999.0;
    let discount = 0.5;

    const cart = $(".cart");
    const btnAddToCard = $(".btn");
    const cartCount = $(".cartCount");
    const productInShoppingCart = $(".productsInCart");
    const productCounter = $(".counter");

    const msgEmpty = $(".msgEmpty");
    const checkout = $(".checkout");

    $(".btnCart").click(function (e) {
        cart.toggleClass("hidden");

    });

    $("#btnPlus").click(function (e) {
        console.log(productCounter)
        setProductCounter(1);
    });
    $("#btnMinus").click(function (e) {
        setProductCounter(-1);
    });


    function setProductCounter(value) {
        if ((productCounterValue + value) > 0) {
            productCounterValue += value;
            productCounter.text(productCounterValue);

        }
        console.log(value);
    }

    btnAddToCard.click(function (e) {
        productsInCart += productCounterValue
        carrito.push(this.getAttribute('marcador'))
        const productHTMLElement = `
        <div class="item">
            <img class="productImg" src="${this.img}" alt="">
            <div class="details">
                <div class="productName">${this.title}</div>
                <div class="priceGroup">
                    <div class="price">$${(this.price).toFixed(2)}</div> x
                    <div class="count">${productsInCart}</div>
                    <div class="totalAmount">$${(this.price * productsInCart).toFixed(2)}</div>
            </div>
            </div>
            <img id="btnDelete" src="../assets/images/icon-delete.svg" alt="icon delete">
        </div>
        `;

        productInShoppingCart.text(productHTMLElement);

        $("#btnDelete").click(function (e) {
            productsInCart--;
            updateCart();
            const totalAmount = $(".totalAmount");
            productCounter.text(productsInCart);
            totalAmount.text(`$${(price * productsInCart).toFixed(2)}`);

            if (productsInCart == 0) {
                productInShoppingCart.text("");
            }
        });
    });
    function updateCart() {
        updateCartIcon();
        updateMsgEmpty();
        updateCheckoutButton();
    }

    function updateCartIcon() {
        cartCount.text(productsInCart);
        if ((productsInCart == 0) && (!cartCount.hasClass("hidden"))) {
            cartCount.hide();
        } else {
            cartCount.show();
        }
    }


    function updateMsgEmpty() {
        if ((productsInCart == 0) && (msgEmpty.hasClass("hidden"))) {
            msgEmpty.show();
        } else {
            if (!msgEmpty.hasClass("hidden")) {
                msgEmpty.hide();
            }
        }

    }

    function updateCheckoutButton() {
        if ((productsInCart == 0) && (!checkout.hasClass('hidden'))) {
            checkout.show();
        } else {
            checkout.hide();
        }
    }
});
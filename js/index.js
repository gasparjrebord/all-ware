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
                $("#allProducts").append(`  
                     
                        <div class="col card" style="width: 40vh;">
                            <a><img src="${product.img}" class="card-img-top img${product.id}" alt="product-${product.id}"></a>
                            <div class="card-body">
                                <h5 class="card-title title">${product.title}</h5>
                                <p class="card-text price">$${product.price}</p>
                                <a class="btn btn-primary btnAddToCart" href="#"><img src="./assets/images/icon-cart.svg" alt="icon cart">Add to cart</a>
                            </div>
                        </div>
                    
                `);

                $(`.img${product.id}`).click(function () {
                    $("#overlayProducts").append(`  
                    <div class="card mb-3 content id${product.id} hidden">
                        <div class="closeBtn">X</div>
                        <img src="${product.img}"
                        class="card-img-top productHero" alt="imageproduct">
                        <div class="card-body">
                            <p class="companyName">ALLWARE</p>
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text price">$${product.price}</p>
                            <div class="countBtnGroup">
                                <div class="counterWrapper">
                                    <div id="btnMinus">-</div>
                                    <div class="counter">1</div>
                                    <div id="btnPlus">+</div>
                                </div>
                                <a class="btn btnAddToCart" href="#"><img src="./assets/images/icon-cart.svg" alt="icon cart">Add to cart</a>
                            </div>
                        </div>
                    </div>
                `);
                    $(`.id${product.id}`).fadeIn();
                    $("#btnPlus").click(function () {
                        console.log(productCounterValue)
                        setProductCounter(1);
                    });
                    $("#btnMinus").click(function () {
                        console.log(productCounterValue)
                        setProductCounter(-1);
                    });
                    $(".closeBtn").click(function () {
                        $(`.id${product.id}`).fadeOut().delay(500);
                        $("#overlayProducts").empty();


                    });


                });
            }
            console.log(products)
        }
    });
    $(".btnAddToCart").click(function () {


        const infoCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        let title = $(".title").val();
        let img = $(".img").val();
        let price = $(".price").val();

        let cartProduct = (
            {
                title: title,
                img: img,
                price: price
            }
        )
        $.ajax({
            type: "POST",
            url: JSON,
            data: cartProduct,
            success: function (response) {
                productsInCart += productCounterValue
                updateCart();
                html += `
                <div class="item">
                    <img class="productImg" src="${response.img}" alt="">
                    <div class="details">
                        <div class="productName">${response.title}</div>
                        <div class="priceGroup">
                            <div class="price">$${(response.price)}</div> x
                            <div class="count">${productsInCart}</div>
                            <div class="totalAmount">$${(response.price * productsInCart).toFixed()}</div>
                    </div>
                    </div>
                    <img id="btnDelete" src="../assets/images/icon-delete.svg" alt="icon delete">
                </div>
                `;

                productInShoppingCart.html(html);

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
            }
        });
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


    function setProductCounter(value) {
        if ((productCounterValue + value) > 0) {
            productCounterValue += value;
            productCounter.text(productCounterValue);

        }
    }


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
        if ((productsInCart == 0) && (!checkout.hasClass("hidden"))) {
            checkout.show();
        } else {
            checkout.hide();
        }
    }
});
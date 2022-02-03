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
    const JSON = "json/articles.json"

    $.ajax({
        type: "GET",
        url: JSON,
        success: function (response) {
            let articles = response
            for (const article of articles) {
                $("#allProducts").append(`  
                        <div class="col card" style="width: 40vh;" data-id="${article.id}">
                            <a><img src="${article.img}" class="card-img-top img${article.id}" alt="product-${article.id}"></a>
                            <div class="card-body">
                                <h5 class="card-title title">${article.title}</h5>
                                <p class="card-text price">$${article.price}</p>
                                <a class="btn btn-primary btnAddToCart" data-id="${article.id}" href="#"><img src="./assets/images/icon-cart.svg" alt="icon cart">Add to cart</a>
                            </div>
                        </div>
                `);

                //overlay

                $(`.img${article.id}`).click(function () {
                    $("#overlayProducts").append(`  
                    <div class="card mb-3 content hidden" data-id="${article.id}">
                        <div class="closeBtn">X</div>
                        <img src="${article.img}"
                        class="card-img-top productHero" alt="imageproduct">
                        <div class="card-body">
                            <p class="companyName">ALLWARE</p>
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text price">$${article.price}</p>
                            <div class="countBtnGroup">
                                <div class="counterWrapper">
                                    <div id="btnMinus">-</div>
                                    <div class="counter">1</div>
                                    <div id="btnPlus">+</div>
                                </div>
                                <a class="btn btnAddToCart" data-id="${article.id}" href="#"><img src="./assets/images/icon-cart.svg" alt="icon cart">Add to cart</a>
                            </div>
                        </div>
                    </div>
                `);
                    $(`.id${article.id}`).fadeIn();

                    $(".closeBtn").click(function () {
                        $(`.id${article.id}`).fadeOut().delay(500);
                        $("#overlayProducts").empty();
                    });
                });
            }
            //console.log(products)
        }
    });

    //carrito
    let productsInCart = [];



    $(".btnAddToCart").click(function (e) {
        e.preventDefault();
        if (e.target.classList.contains('btnAddToCart')) {
            const productSelected = e.target.parentElement.parentElement;
            readDataProduct(productSelected);
        }
        function readDataProduct(product) {
            // console.log(curso);

            // Crear un objeto con el contenido del curso actual
            const dataProduct = {
                image: product.$("img").src(),
                title: product.$("h5").text(),
                price: product.$("p").text(),
                id: product.$("a").attr("data-id"),
                quantity: 1
            }

            // Revisa si un elemento ya existe en el carrito
            const exist = productsInCart.some(product => product.id === dataProduct.id);

            if (exist) {
                // Actualizamos la cantidad
                const products = productsInCart.map(product => {
                    if (product.id === dataProduct.id) {
                        product.quantity++;
                        return product; // retorna el objeto actualizado
                    } else {
                        return product; // retorna los objetos que no son los duplicados
                    }
                });
                productsInCart = [...products];
            } else {
                // Agrega elementos al arreglo de carrito
                productsInCart = [...productsInCart, dataProduct];
            }

            console.log(productsInCart);

            carritoHTML();
        }
        // Muestra el Carrito de compras en el HTML
        function cartHTML() {

            // Limpiar el HTML
            cleanHTML();

            // Recorre el carrito y genera el HTML

            productsInCart.forEach(product => {
                const { image, title, price, quantity, id } = product;
                html += `
                <div class="item">
                    <img class="productImg" src="${image}" alt="">
                    <div class="details">
                        <div class="productName">${title}</div>
                        <div class="priceGroup">
                            <div class="price">$${price}</div> x
                            <div class="count">${quantity}</div>
                            <div class="totalAmount">$${(price * quantity).toFixed()}</div>
                    </div>
                    </div>
                    <img id="btnDelete" src="../assets/images/icon-delete.svg" alt="icon delete">
                </div>
                `;
                // Agregamos el HTML del carrito en el tbody
                productInShoppingCart.html(html);
            });

            // Agregar el carrito de compras al storage
            updateStorage();

        }

        function updateStorage() {
            localStorage.setItem("cart", JSON.stringify(productsInCart));
        }

        // Elimina los cursos del tbody
        function cleanHTML() {
            // mejor performance para limpiar nuestro HTML
            while (contenedorCarrito.firstChild) {
                contenedorCarrito.removeChild(contenedorCarrito.firstChild);
            }
        }


        //cart

        $(".btnCart").toggleClass("hidden");




        $("#btnPlus").click(function () {
            console.log(productCounterValue)
            setProductCounter(1);
        });
        $("#btnMinus").click(function () {
            console.log(productCounterValue)
            setProductCounter(-1);
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
            cartCount.text(productNmr);
            if ((counter == 0) && (!cartCount.hasClass("hidden"))) {
                cartCount.hide();
            } else {
                cartCount.show();
            }
        }


        function updateMsgEmpty() {
            if ((productNmr == 0) && (msgEmpty.hasClass("hidden"))) {
                msgEmpty.show();
            } else {
                if (!msgEmpty.hasClass("hidden")) {
                    msgEmpty.hide();
                }
            }

        }

        function updateCheckoutButton() {
            if ((productNmr == 0) && (!checkout.hasClass("hidden"))) {
                checkout.show();
            } else {
                checkout.hide();
            }
        }
    });
})
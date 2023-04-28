// code to hide cart link if user is not logged in
$(document).ready(function () {
    // master product data array
    var products = [];

    $("#alert-success").fadeTo(1000, 500).slideUp(300, function(){
        $("#alert-success").slideUp(300);
    });

    // ajax call to get all products
    $.ajax({
        url: "./allcourses",
        type: "GET",
        success: function (response) {
            console.log(response);
            result = JSON.parse(response);
            result.forEach(course => {
                products.push({
                    id: course[0],
                    image: course[1],
                    name: course[2],
                    description: course[3],
                    price: course[4],
                    discounted_price: course[5],
                    rating: course[6]
                });
            });
        }
    });

    let cart = localStorage.getItem("cart");
    let cartJson = [];
    if (cart) {
        cartJson = JSON.parse(localStorage.getItem("cart"));
        $("#cart-link > a > span").html(cartJson.length || 0);
        console.log($(".course-card > card-body > button"));
        $("div.course-card > .card-body > button").each(function () {
            var product_id = $(this).attr("data-id");
            if (cartJson.find(x => x.id == product_id)) {
                $(this).html("Go to cart");
                $(this).removeClass("btn-primary");
                $(this).addClass("btn-secondary");
            }
        }
        );
    }

    // handle login form submit
    $('#login_form').on('submit', function (e) {
        if (!this.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        }
        this.classList.add('was-validated');
        localStorage.clear();
    });

    // handle register form submit
    $('#register_form').on('submit', function (e) {
        if (!this.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        }
        this.classList.add('was-validated')
    });

    $('#contact_form').on('submit', function (e) {
        if (!this.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        }
        this.classList.add('was-validated')
    });

    function onSearch() {
        $("#search_form button").click();
    }

    loadCart();

    $(".add-to-cart").click(function () {
        console.log(this);

        if(this.outerText == "Go to cart"){
            window.location.href = "cart";
            return;
        }

        var product_id = $(this).attr("data-id");
        console.log(product_id);
        let cart = localStorage.getItem("cart");

        let cartJson = [];
        if (cart) {
            cartJson = JSON.parse(localStorage.getItem("cart"));
        }

        if (cartJson.find(x => x.id == product_id)) {
            return;
        }
        else {
            cartJson.push(products.filter(x => x.id == product_id)[0]);
            localStorage.setItem("cart", JSON.stringify(cartJson));
            $("#cart-link > a > span").html(cartJson.length || 0);
        }
        this.innerText = "Go to cart";
        console.log(this);
        $(this).removeClass("btn-primary");
        $(this).addClass("btn-secondary");
    });


    function loadCart() {
        if(cartJson.length == 0) {
            $("#cart-section").html(`<p class="text-center">No items in cart!</p>`);
            return;
        }
        $("#cart-section").html(cartJson.map((cartItem) => {
            return `
            <div class="col-12 mb-4 mb-lg-0">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row justify-content-around">
                                            <div class="col">
                                                <h5 class="mb-2">${cartItem.name}</h5>
                                            </div>
                                            <div class="col">
                                                <button id="${cartItem.id}" data-id="${cartItem.id}" class="remove-cart-item btn btn-sm btn-danger" title="remove item" type="button" name="button">&times;</button>
                                            </div>
                                        </div>
                                        <hr>
                                        <p>${cartItem.description}</p>
                                        <div class="d-flex mb-3">
                                            <p class="text-danger mx-2"><s>${cartItem.price}</s></p>
                                            <h5 class="text-dark mb-0">${cartItem.discounted_price}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        }).join(''));

        $("#cart-section").append(
            `<div>
                <p style="font-weight: 600; padding:10px; float:right"><bold>Grand Total: ${cartJson.reduce((accumulator, item) => accumulator + +item.discounted_price.slice(1), 0)}$</bold></p>
            </div>`);
    
        $(".remove-cart-item").click(function () {
            var product_id = $(this).attr("data-id");
            let index = cartJson.map(e => e.id).indexOf(product_id);
            if (index > -1) { // only splice array when item is found
                cartJson.splice(index, 1); // 2nd parameter means remove one item only
            }
            localStorage.setItem("cart", JSON.stringify(cartJson));
            loadCart();
        });
        
    }

    const searchFocus = document.getElementById('search-focus');
    const keys = [
        { keyCode: 'AltLeft', isTriggered: false },
        { keyCode: 'ControlLeft', isTriggered: false },
    ];

    if(searchFocus) {
        searchFocus.addEventListener("search", onSearch);

        window.addEventListener('keydown', (e) => {
            keys.forEach((obj) => {
                if (obj.keyCode === e.code) {
                    obj.isTriggered = true;
                }
            });

            const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

            if (shortcutTriggered) {
                searchFocus.focus();
            }

        });

        window.addEventListener('keyup', (e) => {
            keys.forEach((obj) => {
                if (obj.keyCode === e.code) {
                    obj.isTriggered = false;
                }
            });
        });
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Python', 'React', 'JavaScript', 'Cloud', 'SQL', 'HTML & CSS', 'C#', 'DSA'],
            datasets: [{
                label: 'Course Purchases in 100s',
                data: [12, 19, 3, 9, 7, 3, 20, 5, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

});

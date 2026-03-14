let cart = [];

function addToCart(name, price) {
    cart.push({name: name, price: price});
    alert(name + " added to cart!");
}

function showCart() {
    let cartItems = document.getElementById("cart-items");
    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item.name + " - ₹" + item.price;
        cartItems.appendChild(li);
        total += item.price;
    });

    document.getElementById("total").textContent = "Total: ₹" + total;
}
<script src="script.js"></script>
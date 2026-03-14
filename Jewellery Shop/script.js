let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });

    alert(productName + " added to cart!");

    console.log(cart);
}

function checkout(){
    alert("Proceeding to checkout");
    window.location.href="checkout.html";
}
// ---------------- Wishlist JavaScript ----------------

// Function to add item to wishlist
function addToWishlist(name, price, img) {
    // Get existing wishlist from localStorage, or create empty array
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if item already exists
    if (!wishlist.some(item => item.name === name)) {
        wishlist.push({ name, price, img });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(name + " added to Wishlist 💖");
    } else {
        alert(name + " is already in your Wishlist");
    }
}

// Function to remove item from wishlist
function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.splice(index, 1); // Remove the item at index
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlist(); // Refresh wishlist display
}

// Function to render wishlist on wishlist.html
function renderWishlist() {
    const container = document.querySelector('.product-container'); // Make sure this div exists on wishlist.html
    if (!container) return; // Do nothing if not on wishlist page

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    container.innerHTML = ''; // Clear previous items

    wishlist.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <img src="${item.img}" height="250">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="addToCartFromWishlist(${index})">Add to Cart</button>
            <button onclick="removeFromWishlist(${index})">Remove</button>
        `;
        container.appendChild(div);
    });
}

// Optional: Add wishlist item to cart
function addToCartFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const item = wishlist[index];
    // Call your existing addToCart function here
    // Example: addToCart(item.name, item.price, item.img);
    alert(item.name)
}
// ===== REGISTER USER =====
function registerUser() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }

    // Get existing users or create empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered');
        return;
    }

    // Add new user
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now login.');
    window.location.href = 'login.html'; // redirect to login page
}

// ===== LOGIN USER =====
function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user)); // store logged-in user
        alert('Login successful!');
        window.location.href = 'profile.html'; // redirect to profile page
    } else {
        alert('Invalid email or password');
    }
}

// ===== PROFILE PAGE =====
function loadProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('profileName').value = currentUser.name;
    document.getElementById('profileEmail').value = currentUser.email;
    document.getElementById('profilePassword').value = currentUser.password;
}

// Update profile info
function updateProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const name = document.getElementById('profileName').value;
    const password = document.getElementById('profilePassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(user => {
        if (user.email === currentUser.email) {
            return { ...user, name, password };
        }
        return user;
    });

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, name, password }));
    alert('Profile updated successfully!');
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'login.html';
}
// ===== SHOP PAGE SEARCH BAR FUNCTION =====
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.getElementById('searchInput');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if(query !== "") {
                // Redirect to shop page with search query
                window.location.href = `shop.html?q=${encodeURIComponent(query)}`;
            } else {
                alert('Please type something to search!');
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if(searchBtn && searchInput){
        searchBtn.addEventListener('click', function(){
            const query = searchInput.value.trim();
            if(query !== ""){
                // Redirect to shop page with search query
                window.location.href = `shop.html?q=${encodeURIComponent(query)}`;
            } else {
                alert('Please type something to search!');
            }
        });
    }
});
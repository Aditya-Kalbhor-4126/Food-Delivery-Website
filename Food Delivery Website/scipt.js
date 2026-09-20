// --- RESTAURANT DATA ---
const restaurants = [
    {
        id: 1,
        name: "Biryani By Kilo",
        rating: 4.4,
        time: "25-30 mins",
        deliveryMinutes: 28,
        priceForTwo: 400,
        cuisines: "Biryani, Mughlai, Kebabs",
        locality: "Sector 14",
        discount: "50% OFF UPTO ₹100",
        isVeg: false,
        hasOffer: true,
        specialItem: "Hyderabadi Dum Biryani",
        itemPrice: 289,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Pizza Hut",
        rating: 4.2,
        time: "20-25 mins",
        deliveryMinutes: 22,
        priceForTwo: 350,
        cuisines: "Pizzas, Pastas, Fast Food",
        locality: "City Center Mall",
        discount: "ITEMS AT ₹179",
        isVeg: false,
        hasOffer: true,
        specialItem: "Farmhouse Cheesy Pizza",
        itemPrice: 249,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Haldiram's Sweets",
        rating: 4.6,
        time: "15-20 mins",
        deliveryMinutes: 18,
        priceForTwo: 250,
        cuisines: "North Indian, Pure Veg, Sweets",
        locality: "Main Market",
        discount: "20% OFF ABOVE ₹299",
        isVeg: true,
        hasOffer: true,
        specialItem: "Special Raj Kachori",
        itemPrice: 140,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Burger King",
        rating: 4.3,
        time: "25-30 mins",
        deliveryMinutes: 25,
        priceForTwo: 300,
        cuisines: "Burgers, American, Shakes",
        locality: "Metro Station Hub",
        discount: "60% OFF UPTO ₹120",
        isVeg: false,
        hasOffer: true,
        specialItem: "Crispy Veg Whopper Meal",
        itemPrice: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Chinese Wok",
        rating: 3.9,
        time: "35-40 mins",
        deliveryMinutes: 38,
        priceForTwo: 300,
        cuisines: "Chinese, Tibetan, Asian",
        locality: "Cyber Park",
        discount: "FLAT ₹50 OFF",
        isVeg: false,
        hasOffer: false,
        specialItem: "Hakka Noodles & Manchurian",
        itemPrice: 210,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Bakingo - Cakes & Desserts",
        rating: 4.7,
        time: "20-25 mins",
        deliveryMinutes: 20,
        priceForTwo: 350,
        cuisines: "Bakery, Desserts, Cakes",
        locality: "South Extension",
        discount: "40% OFF UPTO ₹80",
        isVeg: true,
        hasOffer: true,
        specialItem: "Belgian Chocolate Pastry",
        itemPrice: 139,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80"
    }
];

// --- CART STATE ---
let cart = {};

// --- RENDER RESTAURANTS ---
function renderRestaurants(list) {
    const grid = document.getElementById("restaurant-grid");
    if (!grid) return;
    
    if (list.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">
            <h3>No restaurants found matching your criteria.</h3>
        </div>`;
        return;
    }

    grid.innerHTML = list.map(r => `
        <div class="restaurant-card">
            <div class="card-image-wrap">
                <img src="${r.image}" alt="${r.name}">
                ${r.discount ? `<div class="card-discount">${r.discount}</div>` : ''}
            </div>
            <div class="card-details">
                <div class="card-name">${r.name}</div>
                <div class="card-meta">
                    <span class="rating-badge">★ ${r.rating}</span>
                    <span>•</span>
                    <span>${r.time}</span>
                </div>
                <div class="card-cuisines">${r.cuisines}</div>
                <div class="card-locality">${r.locality} • ₹${r.priceForTwo} for two</div>
                <button class="add-dish-btn" onclick="addToCart(${r.id})">
                    + Add ${r.specialItem} (₹${r.itemPrice})
                </button>
            </div>
        </div>
    `).join('');
}

// --- FILTERING LOGIC ---
let currentFilter = 'all';

function applyFilter(type) {
    currentFilter = type;
    document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.remove("active"));
    event.target.classList.add("active");

    let filtered = [...restaurants];

    if (type === 'veg') {
        filtered = filtered.filter(r => r.isVeg);
    } else if (type === 'rating') {
        filtered = filtered.filter(r => r.rating >= 4.0);
    } else if (type === 'fast') {
        filtered = filtered.filter(r => r.deliveryMinutes <= 25);
    } else if (type === 'offers') {
        filtered = filtered.filter(r => r.hasOffer);
    }

    renderRestaurants(filtered);
}

function filterByCategory(categoryName) {
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = categoryName;

    const filtered = restaurants.filter(r => 
        r.cuisines.toLowerCase().includes(categoryName.toLowerCase()) ||
        r.specialItem.toLowerCase().includes(categoryName.toLowerCase())
    );
    renderRestaurants(filtered);

    // Scroll to restaurants section smoothly
    document.getElementById("restaurants")?.scrollIntoView({ behavior: 'smooth' });
}

// --- SEARCH FUNCTIONALITY ---
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = restaurants.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.cuisines.toLowerCase().includes(query) ||
        r.specialItem.toLowerCase().includes(query)
    );
    renderRestaurants(filtered);
}

if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
}
if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
}

// --- CART FUNCTIONALITY ---
function addToCart(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;

    if (!cart[restaurantId]) {
        cart[restaurantId] = {
            id: restaurant.id,
            name: restaurant.specialItem,
            restaurantName: restaurant.name,
            price: restaurant.itemPrice,
            qty: 1
        };
    } else {
        cart[restaurantId].qty += 1;
    }

    updateCartUI();
    openCart();
}

function updateQty(restaurantId, change) {
    if (!cart[restaurantId]) return;

    cart[restaurantId].qty += change;
    if (cart[restaurantId].qty <= 0) {
        delete cart[restaurantId];
    }

    updateCartUI();
}

function updateCartUI() {
    const totalCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById("cart-count");
    if (badge) badge.innerText = totalCount;

    const container = document.getElementById("cart-items-container");
    const subtotalEl = document.getElementById("bill-subtotal");
    const totalEl = document.getElementById("bill-total");
    const cartFooter = document.getElementById("cart-footer");

    if (totalCount === 0) {
        container.innerHTML = `
            <div style="text-align: center; margin-top: 60px; color: #7e808c;">
                <p style="font-size: 40px; margin-bottom: 10px;">🛒</p>
                <h4>Your cart is empty</h4>
                <p style="font-size: 13px; margin-top: 6px;">Add items from restaurants to start ordering!</p>
            </div>
        `;
        if (cartFooter) cartFooter.style.display = "none";
        return;
    }

    if (cartFooter) cartFooter.style.display = "block";

    let subtotal = 0;
    container.innerHTML = Object.values(cart).map(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        return `
            <div class="cart-item-row">
                <div>
                    <div class="cart-item-title">${item.name}</div>
                    <small style="color: #686b78; font-size: 11px;">${item.restaurantName}</small>
                    <div style="font-weight: 700; font-size: 13px; margin-top: 4px;">₹${itemTotal}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                    <span style="font-size: 13px; font-weight: bold;">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');

    const delivery = 40;
    const taxes = 15;
    const finalTotal = subtotal + delivery + taxes;

    if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
    if (totalEl) totalEl.innerText = `₹${finalTotal}`;
}

function checkout() {
    alert("🎉 Order placed successfully! Thank you for ordering with Swiggy.");
    cart = {};
    updateCartUI();
    closeCart();
}

// --- DRAWER & MODAL CONTROLS ---
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");

function openCart() {
    cartDrawer?.classList.add("open");
    cartOverlay?.classList.add("active");
}
function closeCart() {
    cartDrawer?.classList.remove("open");
    cartOverlay?.classList.remove("active");
}

openCartBtn?.addEventListener("click", openCart);
closeCartBtn?.addEventListener("click", closeCart);
cartOverlay?.addEventListener("click", closeCart);

// Sign in Modal
const signinModal = document.getElementById("signin-modal");
const signinOverlay = document.getElementById("signin-overlay");
const openSigninBtn = document.getElementById("open-signin-btn");
const closeSigninBtn = document.getElementById("close-signin-btn");

function openSignin() {
    signinModal?.classList.add("active");
    signinOverlay?.classList.add("active");
}
function closeSignin() {
    signinModal?.classList.remove("active");
    signinOverlay?.classList.remove("active");
}

openSigninBtn?.addEventListener("click", openSignin);
closeSigninBtn?.addEventListener("click", closeSignin);
signinOverlay?.addEventListener("click", closeSignin);

function handleLogin() {
    const phone = document.getElementById("user-phone").value.trim();
    if (phone.length < 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }
    alert(`OTP sent to +91 ${phone}!`);
    closeSignin();
}

// --- INITIALIZE ---
document.addEventListener("DOMContentLoaded", () => {
    renderRestaurants(restaurants);
    updateCartUI();
});
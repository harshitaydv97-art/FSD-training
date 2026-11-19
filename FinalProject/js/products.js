// Product Database

const products = [

    {
        id: 1,
        brand: "Roadster",
        name: "Casual Women's Top",
        category: "Women",
        price: 599,
        image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=500"
    },

    {
        id: 2,
        brand: "HRX",
        name: "Men's Casual Shirt",
        category: "Men",
        price: 899,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"
    },

    {
        id: 3,
        brand: "DressBerry",
        name: "Women's Fashion Dress",
        category: "Women",
        price: 1299,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500"
    },

    {
        id: 4,
        brand: "Puma",
        name: "Sports Sneakers",
        category: "Footwear",
        price: 1499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },

    {
        id: 5,
        brand: "Roadster",
        name: "Men's Denim Jacket",
        category: "Men",
        price: 1799,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    },

    {
        id: 6,
        brand: "Accessorize",
        name: "Fashion Handbag",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },

    {
        id: 7,
        brand: "Nike",
        name: "Running Shoes",
        category: "Footwear",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },

    {
        id: 8,
        brand: "DressBerry",
        name: "Women's Casual Outfit",
        category: "Women",
        price: 1599,
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500"
    }

];


// DOM Elements

const productContainer =
    document.getElementById("productContainer");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const productCount =
    document.getElementById("productCount");

let selectedCategory = "All";


// Display Products

function displayProducts(productList) {

    productContainer.innerHTML = "";

    productCount.innerText =
        productList.length + " Products";

    if (productList.length === 0) {

        productContainer.innerHTML =
            `<p class="empty-message">No products found.</p>`;

        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.brand}</h3>

                <p>${product.name}</p>

                <p class="price">Rs. ${product.price}</p>

            </div>

            <div class="card-buttons">

                <button class="add-btn"
                    onclick="addToBag(${product.id})">
                    ADD TO BAG
                </button>

                <button class="wishlist-btn"
                    onclick="addToWishlist(${product.id})">
                    ♡
                </button>

            </div>

        `;

        productContainer.appendChild(card);

    });

}


// Add to Bag

function addToBag(productId) {

    let bag = JSON.parse(
        localStorage.getItem("myntraBag")
    ) || [];

    const existingProduct =
        bag.find(item => item.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        bag.push({
            id: productId,
            quantity: 1
        });

    }

    localStorage.setItem(
        "myntraBag",
        JSON.stringify(bag)
    );

    updateBagCount();

    alert("Product added to your bag!");

}


// Add to Wishlist

function addToWishlist(productId) {

    let wishlist = JSON.parse(
        localStorage.getItem("myntraWishlist")
    ) || [];

    if (wishlist.includes(productId)) {

        alert("Product is already in your wishlist!");

        return;
    }

    wishlist.push(productId);

    localStorage.setItem(
        "myntraWishlist",
        JSON.stringify(wishlist)
    );

    alert("Product added to wishlist!");

}


// Update Bag Count

function updateBagCount() {

    const bag = JSON.parse(
        localStorage.getItem("myntraBag")
    ) || [];

    const totalItems = bag.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("bagCount").innerText =
        totalItems;

}


// Category Filtering

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", function () {

        document.querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        selectedCategory = this.dataset.category;

        applyFilters();

    });

});


// Search Functionality

searchInput.addEventListener("input", applyFilters);


// Sorting

sortSelect.addEventListener("change", applyFilters);


function applyFilters() {

    const searchValue =
        searchInput.value.toLowerCase();

    let filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.brand.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;

    });


    if (sortSelect.value === "low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }

    else if (sortSelect.value === "high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }

    displayProducts(filteredProducts);

}


// Initialize

updateBagCount();

displayProducts(products);
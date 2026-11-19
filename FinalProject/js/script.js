// Product Data

const products = [

    {
        name: "Casual Women's Top",
        brand: "Roadster",
        price: 599,
        image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=500"
    },

    {
        name: "Men's Casual Shirt",
        brand: "HRX",
        price: 899,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"
    },

    {
        name: "Stylish Women's Outfit",
        brand: "DressBerry",
        price: 1299,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500"
    },

    {
        name: "Casual Sneakers",
        brand: "Puma",
        price: 1499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    }

];


// Display Products

const productContainer = document.getElementById("productContainer");

function displayProducts(productList) {

    productContainer.innerHTML = "";

    productList.forEach((product, index) => {

        productContainer.innerHTML += `

            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.brand}</h3>

                <p>${product.name}</p>

                <p class="price">Rs. ${product.price}</p>

                <button class="add-btn" onclick="addToBag(${index})">
                    ADD TO BAG
                </button>

            </div>

        `;

    });

}


// Shopping Bag

let bagCount = 0;

function addToBag(index) {

    bagCount++;

    document.getElementById("bagCount").innerText = bagCount;

    alert(products[index].name + " added to bag!");

}


// Search Products

document.getElementById("searchInput").addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();

    const filteredProducts = products.filter(product =>

        product.name.toLowerCase().includes(searchValue) ||

        product.brand.toLowerCase().includes(searchValue)

    );

    displayProducts(filteredProducts);

});


// Scroll to Products

function scrollToProducts() {

    document.getElementById("products").scrollIntoView({

        behavior: "smooth"

    });

}


// Initialize Website

displayProducts(products);
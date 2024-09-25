// Array to store cart items
let cart = [];

// Array to hold all products (simulating product data)
const products = [
    { name: 'Eco-Friendly Cleaning Spray', price: 19.99, category: 'eco-friendly' },
    { name: 'Smart Vacuum Cleaner', price: 249.99, category: 'smart-home' },
    { name: 'Organic Floor Cleaner', price: 29.99, category: 'organic' },
    { name: 'Luxury Cleaning Set', price: 99.99, category: 'luxury' }
];

// Function to display products dynamically
function displayProducts(filteredProducts) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Clear current product listings

    filteredProducts.forEach(product => {
        const productItem = `
            <div class="product-item">
                <img src="assets/images/product1.jpg" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <a href="product-details.html" class="view-details">View Details</a>
            </div>
        `;
        productGrid.innerHTML += productItem;
    });
}

// Initial display of all products
displayProducts(products);

// Filter and sorting logic
document.getElementById('filter-form').addEventListener('change', function() {
    let category = document.getElementById('category').value;
    let price = document.getElementById('price').value;
    let sort = document.getElementById('sort').value;

    // Filtering products by category
    let filteredProducts = products.filter(product => {
        if (category === 'all') return true; // Show all if "all" is selected
        return product.category === category;
    });

    // Filtering products by price range
    filteredProducts = filteredProducts.filter(product => {
        if (price === 'low') return product.price < 50;
        if (price === 'mid') return product.price >= 50 && product.price <= 200;
        if (price === 'high') return product.price > 200;
        return true; // Show all if "all" is selected
    });

    // Sorting products based on selected sort option
    if (sort === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'popularity') {
        // Implement a popularity metric if needed, default to showing as-is
    }

    // Display filtered and sorted products
    displayProducts(filteredProducts);
});

// Function to add product to cart
function addToCart(product) {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    
    if (existingProductIndex >= 0) {
        // If product already exists, increment quantity
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // Add new product to the cart
        cart.push(product);
    }
    
    updateCartUI();
    alert(`${product.name} has been added to your cart!`);
}

// Function to update the cart UI
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear current cart UI

    let subtotal = 0;

    // Loop through each cart item and display it in the cart table
    cart.forEach(item => {
        const total = item.price * item.quantity;
        subtotal += total;

        const cartRow = `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${total.toFixed(2)}</td>
            </tr>
        `;
        cartItemsContainer.innerHTML += cartRow;
    });

    // Update subtotal in the cart summary
    document.querySelector('.cart-summary p strong').innerText = `Subtotal: $${subtotal.toFixed(2)}`;
}

// Product details page: Adding event listener to the "Add to Cart" button
if (document.getElementById('add-to-cart')) {
    document.getElementById('add-to-cart').addEventListener('click', function() {
        const product = {
            name: 'Eco-Friendly Cleaning Spray',
            price: 19.99,
            quantity: 1
        };

        addToCart(product);
    });
}

// Cart page: Adding event listener to "Proceed to Checkout" button
if (document.getElementById('checkout-button')) {
    document.getElementById('checkout-button').addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Proceeding to checkout...');
            // Redirect to checkout.html or integrate payment gateway logic here
            window.location.href = 'checkout.html';
        } else {
            alert('Your cart is empty!');
        }
    });
}

// Checkout page: Handling form submission
if (document.getElementById('checkout-form')) {
    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission for now

        // Collect form data
        const customerName = document.getElementById('name').value;
        const customerEmail = document.getElementById('email').value;
        const shippingAddress = document.getElementById('address').value;
        const cardDetails = document.getElementById('card').value;

        // Simulating an order placement (You can integrate payment gateway here)
        alert(`Thank you for your purchase, ${customerName}! Your order will be shipped to ${shippingAddress}.`);

        // Clear the cart after successful checkout
        cart = [];
        updateCartUI();
        window.location.href = 'index.html'; // Redirect to home page after checkout
    });
}

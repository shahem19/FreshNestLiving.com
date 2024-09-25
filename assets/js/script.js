// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Array to store cart items
    let cart = [];

    // Array to hold all products (simulating product data)
    const products = [
        { name: 'Eco-Friendly Cleaning Spray', price: 19.99, category: 'eco-friendly' },
        { name: 'Smart Vacuum Cleaner', price: 249.99, category: 'smart-home' },
        { name: 'Organic Floor Cleaner', price: 29.99, category: 'organic' },
        { name: 'Luxury Cleaning Set', price: 99.99, category: 'luxury' }
    ];

    // Load cart from localStorage if available
    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            updateCartUI();
        }
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to display products dynamically
    function displayProducts(filteredProducts) {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) {
            // If .product-grid doesn't exist, exit the function
            console.error('Product grid not found on this page.');
            return;
        }
        
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

    // Check if the filter form and product grid exist on the current page
    if (document.querySelector('.product-grid')) {
        // Initial display of all products
        displayProducts(products);

        // Filter and sorting logic
        const filterForm = document.getElementById('filter-form');
        if (filterForm) {
            filterForm.addEventListener('change', function() {
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
                }

                // Display filtered and sorted products
                displayProducts(filteredProducts);
            });
        }
    }

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

        saveCart(); // Save cart to localStorage
        updateCartUI();
        alert(`${product.name} has been added to your cart!`);
    }

    // Function to update the cart UI
    function updateCartUI() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) {
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
            const cartSummary = document.querySelector('.cart-summary p strong');
            if (cartSummary) {
                cartSummary.innerText = `Subtotal: $${subtotal.toFixed(2)}`;
            }
        }
    }

    // Product details page: Adding event listener to the "Add to Cart" button if it exists
    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            const product = {
                name: 'Eco-Friendly Cleaning Spray',
                price: 19.99,
                quantity: 1
            };

            addToCart(product);
        });
    }

    // Load cart on page load
    loadCart();

    // Cart page: Adding event listener to "Proceed to Checkout" button if it exists
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length > 0) {
                alert('Proceeding to checkout...');
                window.location.href = 'checkout.html'; // Redirect to checkout page
            } else {
                alert('Your cart is empty!');
            }
        });
    }

    // Checkout page: Handling form submission if the checkout form exists
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission for now

            // Collect form data
            const customerName = document.getElementById('name').value;
            const customerEmail = document.getElementById('email').value;
            const shippingAddress = document.getElementById('address').value;

            alert(`Thank you for your purchase, ${customerName}! Your order will be shipped to ${shippingAddress}.`);

            // Clear the cart after successful checkout
            cart = [];
            saveCart(); // Clear cart in localStorage
            updateCartUI();
            window.location.href = 'index.html'; // Redirect to home page after checkout
        });
    }
});

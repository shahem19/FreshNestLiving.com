// Filter and sorting logic
document.getElementById('filter-form').addEventListener('change', function() {
    let category = document.getElementById('category').value;
    let price = document.getElementById('price').value;
    let sort = document.getElementById('sort').value;

    console.log(`Category: ${category}, Price: ${price}, Sort: ${sort}`);

    // Implement filtering logic for products (mock for now)
    // You could fetch or filter products dynamically
    // For demo purposes, we can show filtered items or alerts
});

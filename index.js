const apiURL = 'https://678502411ec630ca33a6c4c3.mockapi.io/';

// Constructor function
function Product(title, price, description, image) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
}

// Fetch and display products
async function fetchProducts() {
    try {
        const response = await fetch(apiURL);
        const products = await response.json();

        const productContainer = document.getElementById('productcard');
        productContainer.innerHTML = '';

        if (Array.isArray(products)) {
            products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>Price: $${product.price}</p>
                    <p>${product.description}</p>
                    <button onclick="updateProduct(${product.id})">Update</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                `;
                productContainer.appendChild(card);
            });
        } else {
            console.error('Data is not an array:', products);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Update product title
async function updateProduct(id) {
    const newTitle = prompt('Enter new title:');
    if (newTitle) {
        try {
            await fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTitle })
            });
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }
}

// Delete product
async function deleteProduct(id) {
    try {
        await fetch(`${apiURL}/${id}`, {
            method: 'DELETE'
        });
        fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

// Create new product
async function createProduct() {
    const title = prompt('Enter product title:');
    const price = prompt('Enter product price:');
    const description = prompt('Enter product description:');
    const image = prompt('Enter product image URL:');

    if (title && price && description && image) {
        try {
            await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new Product(title, price, description, image))
            });
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    const createButton = document.createElement('button');
    createButton.textContent = 'Create New Product';
    createButton.onclick = createProduct;
    document.body.appendChild(createButton);
});

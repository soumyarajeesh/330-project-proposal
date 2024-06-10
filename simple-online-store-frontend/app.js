const apiUrl = 'http://localhost:5001/api';

document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    alert('Registration successful');
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
    alert('Registration failed');
  }
});

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    alert('Login successful');
    document.getElementById('product-section').style.display = 'block';
    console.log(data);
    fetchProducts();
  } catch (error) {
    console.error('Error:', error);
    alert('Login failed');
  }
});

document.getElementById('product-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('product-name').value;
  const description = document.getElementById('product-description').value;
  const price = document.getElementById('product-price').value;
  const category = document.getElementById('product-category').value;
  const images = document.getElementById('product-images').value.split(',');

  try {
    const response = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, description, price, category, images })
    });
    const data = await response.json();
    alert('Product created successfully');
    console.log(data);
    fetchProducts();
  } catch (error) {
    console.error('Error:', error);
    alert('Product creation failed');
  }
});

async function fetchProducts() {
  try {
    const response = await fetch(`${apiUrl}/products`);
    const products = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = `${product.name} - $${product.price}`;
      productList.appendChild(li);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

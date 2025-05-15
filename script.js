// ==== Data ====

// 12 example products for products.html
const products = [
  { id: 1, name: "Eco Kraft Box", price: 100, description: "Durable kraft paper box", image: "images/Ecokraft.avif" },
  { id: 2, name: "Clear Plastic Bag", price: 250, description: "Transparent plastic bags", image: "images/transparentbags.webp" },
  { id: 3, name: "Bubble Wrap Roll", price: 1000, description: "Protective bubble wrap", image: "images/bubblewrap.webp" },
  { id: 4, name: "Tape Dispenser", price: 2500, description: "Handy tape dispenser", image: "images/tape.jfif" },
  { id: 5, name: "Gift Box Set", price: 1500, description: "Assorted gift boxes", image: "images/giftbox.jfif" },
  { id: 6, name: "Shipping Label", price: 400, description: "Adhesive shipping labels", image: "images/label.jfif" },
  { id: 7, name: "Foam Peanuts", price: 5000, description: "Protective foam peanuts", image: "images/foam.jfif" },
  { id: 8, name: "Corrugated Sheet", price: 4500, description: "Durable corrugated sheets", image: "images/corrugated.jfif" },
  { id: 9, name: "Plastic Wrap Roll", price: 3690, description: "Stretchable plastic wrap", image: "images/plasticwrap.jfif" },
  { id: 10, name: "Packing Paper", price: 1496, description: "Recycled packing paper", image: "images/packingpaper.jfif" },
  { id: 11, name: "Mailer Envelope", price: 542, description: "Padded mailer envelopes", image: "images/mailer.jfif" },
  { id: 12, name: "Tape Roll", price: 420, description: "Strong adhesive tape", image: "images/taperoll.jfif" }
];

// ==== Utility Functions ====

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function saveToLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocal(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// ==== Dark Mode ====

const darkModeToggle = $('#darkModeToggle');

function applyDarkMode(dark) {
  if (dark) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
  }
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    applyDarkMode(!isDark);
  });
}

const savedDarkMode = localStorage.getItem('darkMode') === 'true';
applyDarkMode(savedDarkMode);

// ==== Authentication ====

function getUsers() {
  return loadFromLocal('users') || [];
}

function saveUsers(users) {
  saveToLocal('users', users);
}

function getCurrentUser() {
  return loadFromLocal('currentUser');
}

function setCurrentUser(user) {
  saveToLocal('currentUser', user);
}

function clearCurrentUser() {
  localStorage.removeItem('currentUser');
}

function updateNavUser() {
  const user = getCurrentUser();
  const navUser = $('#navUser');
  if (!navUser) return;
  if (user) {
    navUser.textContent = `Hi, ${user.username}`;
    navUser.style.display = 'inline-block';
    $('#logoutBtn') && ($('#logoutBtn').style.display = 'inline-block');
    $('#loginLink') && ($('#loginLink').style.display = 'none');
    $('#signupLink') && ($('#signupLink').style.display = 'none');
  } else {
    navUser.style.display = 'none';
    $('#logoutBtn') && ($('#logoutBtn').style.display = 'none');
    $('#loginLink') && ($('#loginLink').style.display = 'inline-block');
    $('#signupLink') && ($('#signupLink').style.display = 'inline-block');
  }
}

// Signup form logic
const signupForm = $('#signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = signupForm.signupUsername.value.trim();
    const email = signupForm.signupEmail.value.trim();
    const password = signupForm.signupPassword.value;
    const confirmPassword = signupForm.signupConfirmPassword.value;

    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill all signup fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const users = getUsers();
    if (users.find(u => u.username === username)) {
      alert('Username already exists!');
      return;
    }

    users.push({ username, email, password });
    saveUsers(users);
    alert('Signup successful! You can now login.');
    signupForm.reset();
    window.location.href = 'login.html';
  });
}

// Login form logic
const loginForm = $('#loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = loginForm.loginUsername.value.trim();
    const password = loginForm.loginPassword.value;

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      setCurrentUser(user);
      alert('Login successful!');
      updateNavUser();
      window.location.href = 'index.html';
    } else {
      alert('Invalid credentials.');
    }
  });
}

// Logout
const logoutBtn = $('#logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    clearCurrentUser();
    updateNavUser();
    window.location.href = 'index.html';
  });
}

updateNavUser();

// ==== Product Rendering & Search ====

function renderProducts(productList) {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;
  productGrid.innerHTML = '';
  productList.forEach(p => {
    // Ensure price is a valid number
    const price = (typeof p.price === 'number' && !isNaN(p.price)) ? p.price : 0;
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" style="max-width:150px;display:block;margin:auto;">
      <h3>${p.name}</h3>
      <p>Kshs.${price.toFixed(2)}</p>
      <p>${p.description}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

// Initial render on products page
if (document.getElementById('productGrid')) {
  renderProducts(products);

  // Live search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const val = searchInput.value.toLowerCase();
      renderProducts(products.filter(p =>
        p.name.toLowerCase().includes(val) ||
        p.description.toLowerCase().includes(val)
      ));
    });
  }
}

// ==== Cart Logic ====

function loadCart() {
  return loadFromLocal('cart') || [];
}

function saveCart(cart) {
  saveToLocal('cart', cart);
}

function addToCart(productId) {
  productId = Number(productId); // Ensure productId is a number
  let cart = loadCart();
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity = Number(existingItem.quantity || 1) + 1;
  } else {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
  alert('Added to cart!');
  if (typeof renderCart === 'function') renderCart();
}

function removeFromCart(productId) {
  let cart = loadCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
  renderCart();
}

function updateQuantity(productId, qty) {
  let cart = loadCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = qty > 0 ? qty : 1;
    saveCart(cart);
    updateCartCount();
    renderCart();
  }
}

function calculateCartSubtotal() {
  const cart = loadCart();
  return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
}

function calculateCartVAT(subtotal) {
  return subtotal * 0.16;
}

function calculateCartTotal() {
  const subtotal = calculateCartSubtotal();
  const vat = calculateCartVAT(subtotal);
  return subtotal + vat;
}

function updateCartCount() {
  const cart = loadCart();
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = $('#cartCount');
  if (badge) badge.textContent = count;
}

function renderCart() {
  const cartContainer = $('#cartContainer');
  const cartTotal = $('#cartTotal');
  const summary = $('#cartSummary');
  const emptyMessage = $('#emptyCartMessage');

  if (!cartContainer) return;

  const cart = loadCart();
  cartContainer.innerHTML = '';

  // === VAT Option ===
  let useVAT = loadFromLocal('useVAT');
  if (useVAT === null) useVAT = true; // default to true

  // VAT toggle UI
  let vatToggleDiv = document.createElement('div');
  vatToggleDiv.style.margin = "1em 0";
  vatToggleDiv.innerHTML = `
    <label>
      <input type="checkbox" id="vatToggle" ${useVAT ? "checked" : ""} />
      Apply 16% VAT
    </label>
  `;
  cartContainer.appendChild(vatToggleDiv);

  const vatToggle = vatToggleDiv.querySelector('#vatToggle');
  vatToggle.addEventListener('change', function () {
    saveToLocal('useVAT', vatToggle.checked);
    renderCart();
  });

  if (cart.length === 0) {
    if (summary) summary.style.display = 'none';
    if (emptyMessage) emptyMessage.style.display = 'block';
    //cartContainer.innerHTML += '<p>Your cart is empty.</p>';
    if (cartTotal) cartTotal.textContent = '0.00';
    return;
  } else {
    if (summary) summary.style.display = 'block';
    if (emptyMessage) emptyMessage.style.display = 'none';
  }

  // List items
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    const itemTotal = item.price * item.quantity * (useVAT ? 1.16 : 1);
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>Price: Kshs.<span class="item-price">${item.price.toFixed(2)}</span></p>
        <label>Qty:
          <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-id="${item.id}">
        </label>
        <p><strong>Item Total${useVAT ? " (incl. VAT)" : ""}:</strong> Kshs.${itemTotal.toFixed(2)}</p>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  // Calculate and display subtotal, VAT, and total
  const subtotal = calculateCartSubtotal();
  const vat = useVAT ? calculateCartVAT(subtotal) : 0;
  const total = subtotal + vat;

  if (summary) {
    summary.innerHTML = `
      <p><strong>Subtotal:</strong> Kshs.<span id="cartSubtotal">${subtotal.toFixed(2)}</span></p>
      <p><strong>VAT (16%):</strong> Kshs.<span id="cartVAT">${vat.toFixed(2)}</span></p>
      <p><strong>Total:</strong> Kshs.<span id="cartTotal">${total.toFixed(2)}</span></p>
      <a href="checkout.html" class="btn checkout-btn">Proceed to Checkout</a>
    `;
  }

  // Attach events for quantity change (add)
  $$('.quantity-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      const qty = parseInt(e.target.value);
      if (qty > 0) updateQuantity(id, qty);
    });
  });

  // Attach events for remove (delete)
  $$('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      removeFromCart(id);
    });
  });
}

// Always update cart count and render cart on page load
updateCartCount();
if ($('#cartContainer')) {
  renderCart();
}

if (window.location.pathname.endsWith('cart.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    renderCart();
  });
}

// ==== Profile Page Logic ====

const profileForm = $('#profileForm');
if (profileForm) {
  const user = getCurrentUser();
  if (user) {
    profileForm.profileUsername.value = user.username;
    profileForm.profileEmail.value = user.email;
    profileForm.profileName.value = user.name || "";
  }

  profileForm.addEventListener('submit', e => {
    e.preventDefault();
    const updatedUser = {
      username: profileForm.profileUsername.value.trim(),
      email: profileForm.profileEmail.value.trim(),
      name: profileForm.profileName.value.trim(),
      password: getCurrentUser().password // keep old password for simplicity
    };
    // Update user in users list
    let users = getUsers();
    users = users.map(u => (u.username === getCurrentUser().username ? updatedUser : u));
    saveUsers(users);
    setCurrentUser(updatedUser);
    alert('Profile updated!');
    updateNavUser();
  });
}

// ==== Checkout Page Logic ====

const checkoutForm = $('#checkoutForm');
if (checkoutForm) {
  // Prevent checkout if cart is empty
  const cart = loadCart();
  if (!cart.length) {
    alert('Your cart is empty. Please add items before checking out.');
    window.location.href = 'cart.html';
  }

  // VAT Option
  let useVAT = loadFromLocal('useVAT');
  if (useVAT === null) useVAT = true;

  // Optionally show cart summary on checkout page
  const main = document.querySelector('main');
  if (main && cart.length) {
    const subtotal = calculateCartSubtotal();
    const vat = useVAT ? calculateCartVAT(subtotal) : 0;
    const total = subtotal + vat;
    let summaryHtml = `
      <h2>Order Summary</h2>
      <ul style="list-style:none;padding:0;">
    `;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity * (useVAT ? 1.16 : 1);
      summaryHtml += `<li>${item.name} x ${item.quantity} - Kshs.${itemTotal.toFixed(2)}${useVAT ? " <small>(incl. VAT)</small>" : ""}</li>`;
    });
    summaryHtml += `
      </ul>
      <p><strong>Subtotal:</strong> Kshs.${subtotal.toFixed(2)}</p>
      <p><strong>VAT (16%):</strong> Kshs.${vat.toFixed(2)}</p>
      <p><strong>Total: Kshs.${total.toFixed(2)}</strong></p>
    `;
    main.insertAdjacentHTML('afterbegin', summaryHtml);
  }

  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    // Simple validation
    const requiredFields = ['fullName', 'address', 'city', 'postalCode', 'country'];
    for (const field of requiredFields) {
      if (!checkoutForm[field].value.trim()) {
        alert('Please fill all shipping fields.');
        return;
      }
    }
    if (!checkoutForm.paymentMethod.value) {
      alert('Please select a payment method.');
      return;
    }

    // Prepare receipt HTML
    const subtotal = calculateCartSubtotal();
    const vat = useVAT ? calculateCartVAT(subtotal) : 0;
    const total = subtotal + vat;
    let receipt = `
      <h2>Order Receipt</h2>
      <p><strong>Name:</strong> ${checkoutForm.fullName.value}</p>
      <p><strong>Address:</strong> ${checkoutForm.address.value}, ${checkoutForm.city.value}, ${checkoutForm.postalCode.value}, ${checkoutForm.country.value}</p>
      <p><strong>Payment Method:</strong> ${checkoutForm.paymentMethod.value}</p>
      <hr>
      <h3>Items:</h3>
      <ul style="list-style:none;padding:0;">
    `;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity * (useVAT ? 1.16 : 1);
      receipt += `<li>${item.name} x ${item.quantity} - Kshs.${itemTotal.toFixed(2)}${useVAT ? " <small>(incl. VAT)</small>" : ""}</li>`;
    });
    receipt += `
      </ul>
      <p><strong>Subtotal:</strong> Kshs.${subtotal.toFixed(2)}</p>
      <p><strong>VAT (16%):</strong> Kshs.${vat.toFixed(2)}</p>
      <p><strong>Total: Kshs.${total.toFixed(2)}</strong></p>
      <p>Thank you for shopping with us!</p>
    `;

    // Print receipt in a new window
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Order Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 2em; }
            h2, h3 { margin-top: 0; }
            ul { margin-bottom: 1em; }
          </style>
        </head>
        <body>
          ${receipt}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();

    // Clear cart
    saveCart([]);
    updateCartCount();
    alert('Order placed successfully!');
    window.location.href = 'index.html';
  });
}

// ==== Contact Form Logic ====

const contactForm = $('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactForm.contactName.value.trim();
    const email = contactForm.contactEmail.value.trim();
    const message = contactForm.contactMessage.value.trim();
    if (!name || !email || !message) {
      alert('Please fill all fields.');
      return;
    }
    alert('Thank you for contacting us!');
    contactForm.reset();
  });
}

// ==== Product Details Page Logic ====
if (window.location.pathname.endsWith('product-details.html')) {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const product = products.find(p => p.id === id);
  const container = document.getElementById('productDetailContainer');
  if (container) {
    if (product) {
      container.innerHTML = `
        <div class="product-detail">
          <img src="${product.image}" alt="${product.name}" style="max-width:300px;display:block;margin-bottom:1rem;" />
          <h2>${product.name}</h2>
          <p><strong>Price:</strong> Kshs.${product.price.toFixed(2)}</p>
          <p>${product.description}</p>
          <button id="addToCartDetail">Add to Cart</button>
        </div>
      `;
      const btn = document.getElementById('addToCartDetail');
      if (btn) btn.addEventListener('click', () => addToCart(product.id));
    } else {
      container.innerHTML = '<p>Product not found.</p>';
    }
  }
}

// Ensure products render if script.js fails to auto-render
if (typeof products !== "undefined" && document.getElementById('productGrid')) {
  function renderProducts(productList) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    productList.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" style="max-width:150px;display:block;margin:auto;">
        <h3>${p.name}</h3>
        <p>Kshs.${p.price.toFixed(2)}</p>
        <p>${p.description}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });
  }
  renderProducts(products);

  // Optional: live search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const val = searchInput.value.toLowerCase();
      renderProducts(products.filter(p =>
        p.name.toLowerCase().includes(val) ||
        p.description.toLowerCase().includes(val)
      ));
    });
  }
}

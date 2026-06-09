let cart = JSON.parse(localStorage.getItem("cart")) || [];

let allProducts = [];
let selectedCategory = "";

// LOAD PRODUCTS
async function loadProducts() {
  let res = await fetch("/products");
  allProducts = await res.json();

  applyFilters(); // always apply filters
}

// RENDER PRODUCTS (ONLY ONE FUNCTION)
function renderProducts(products) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {

    let isAvailable = Number(p.available) === 1;

    let stockUI = "";

    if (!isAvailable) {
      stockUI = `<p class="out">❌ Out of Stock</p>`;
    } else if (p.price < 50) {
      stockUI = `<p class="low">🔥 Only Few Left</p>`;
    } else {
      stockUI = `<p class="in">✅ In Stock</p>`;
    }

    container.innerHTML += `
  <div class="card">
    <img src="/${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>

    ${stockUI}

    <input type="number" min="1" value="1" id="qty-${p.id}" ${!isAvailable ? "disabled" : ""}>

    <button
      onclick="addToCart(${p.id},'${p.name}',${p.price})"
      ${!isAvailable ? "disabled" : ""}
    >
      ${isAvailable ? "Add to Cart" : "Unavailable"}
    </button>
  </div>
`;
  });
}

// FILTERS
function setCategory(category) {
  selectedCategory = category;
  applyFilters();
}

function applyFilters() {
  let searchText = document
    .getElementById("search")
    .value.toLowerCase();

  let filtered = allProducts.filter(p => {
    let matchSearch = p.name.toLowerCase().includes(searchText);
    let matchCategory =
      selectedCategory === "" || p.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  renderProducts(filtered);
}

// ADD TO CART
function addToCart(id, name, price) {
  let product = allProducts.find(p => p.id === id);

  if (Number(product.available) !== 1) {
    alert("Product is out of stock!");
    return;
  }

  let qty = parseInt(document.getElementById(`qty-${id}`).value);

  let item = cart.find(i => i.id === id);

  if (item) item.qty += qty;
  else cart.push({ id, name, price, qty });

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// CART
function loadCart() {
  renderCart();
}

function renderCart() {
  let container = document.getElementById("cart");
  let total = 0;

  container.innerHTML = "";

  cart.forEach((item, i) => {
    let sub = Number(item.price) * Number(item.qty);
    total += sub;

    container.innerHTML += `
      <div class="cart-item">
        <b>${item.name}</b><br>
        ₹${item.price} × ${item.qty} = ₹${sub}<br>

        <button onclick="changeQty(${i},1)">+</button>
        <button onclick="changeQty(${i},-1)">-</button>
        <button onclick="removeItem(${i})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

// CART ACTIONS
function changeQty(i, val) {
  cart[i].qty += val;
  if (cart[i].qty <= 0) cart.splice(i, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// CHECKOUT
function checkout() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Login first");
    window.location.href = "login.html";
    return;
  }

  let msg = "🛒 Order\n\n";
  let total = 0;

  cart.forEach(i => {
    let sub = i.price * i.qty;
    msg += `${i.name} x${i.qty} = ₹${sub}\n`;
    total += sub;
  });

  msg += `\nTotal ₹${total}`;

  fetch("/save-sale", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.name,
      phone: user.phone,
      total
    })
  });

  window.open(
    `https://wa.me/917907508592?text=${encodeURIComponent(msg)}`
  );

  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// AUTO REFRESH PRODUCTS
setInterval(loadProducts, 3000);

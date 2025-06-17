async function fetchProducts(category = "all") {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "Loading...";

  let url = "https://fakestoreapi.in/api/products";
  if (category !== "all") {
    url = `https://fakestoreapi.in/api/products/category?type=${category}`;
  }

  try {
    const res = await fetch(url);
    let data = await res.json();
    data = data.products;

    grid.innerHTML = "";
    if (!Array.isArray(data) || data.length === 0) {
      grid.innerHTML = "<p>No products found.</p>";
      return;
    }

    data.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p class="category">${product.category}</p>
        <p class="price">₹${product.price}</p>
        <p class="desc">${product.description.slice(0, 100)}...</p>
        <button>Add to Cart</button>
      `;

      const button = card.querySelector("button");
      button.addEventListener("click", () => addToCart(product));

      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    grid.innerHTML = "<p>Error loading products.</p>";
  }
}






function addToCart(product) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user || !localStorage.getItem("isLoggedIn")) {
    alert("Please log in to add items to cart.");
    return;
  }

  const cartKey = `cart_${user.id}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // Optionally, check if product already exists
  const exists = cart.find(item => item.id === product.id);
  if (exists) {
    alert("Product already in cart.");
    return;
  }

  cart.push(product);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert("Product added to cart!");
}

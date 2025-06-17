function header() {
  const e = document.getElementById('header');
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};

  e.innerHTML = `
    <link rel="stylesheet" href="header.css">
    <header>
      <div class="left">
        <h1>MyShop</h1>
      </div>

      <div class="center">
        <a href="index.html">Home</a>
        <a href="products.html">Products</a>
        <a href="contact.html">Contact</a>
      </div>

      ${
        isLoggedIn
          ? `
        <div class="right profile-dropdown" id="profileDropdown">
          <button class="dropdown-toggle" id="profileBtn">👤 ${user.name.firstname || "Profile"}</button>
          <div class="dropdown-content" id="dropdownContent">
            <a href="#">My Orders</a>
            <a href="cart.html">Wishlist</a>
            <a href="#" onclick="logout()">Logout</a>
          </div>
        </div>`
          : `
        <div class="right" id="authButtons">
          <button onclick="location.href='login.html'">Login</button>
          <button onclick="location.href='signup.html'">Signup</button>
        </div>`
      }
    </header>
  `;

  // Add toggle logic if user is logged in
  if (isLoggedIn) {
    const btn = document.getElementById("profileBtn");
    const dropdown = document.getElementById("dropdownContent");

    btn.addEventListener("click", () => {
      dropdown.classList.toggle("show");
    });

    // Close on outside click
    window.addEventListener("click", (e) => {
      if (!e.target.matches('#profileBtn')) {
        dropdown.classList.remove("show");
      }
    });
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  location.reload();
}

header();

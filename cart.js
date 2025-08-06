let cart = [];

// Simpan cart ke localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Ambil cart dari localStorage saat halaman dimuat
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

function toggleCart() {
  document.querySelector(".cart-sidebar").classList.toggle("open");
}

function addToCart(productName, price) {
  const existingItem = cart.find((item) => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  saveCart(); // Simpan ke localStorage setiap kali berubah
  renderCart();
}

function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  if (!cartItemsDiv) return; // Amanin kalau elemen tidak ada di halaman

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <strong>${item.name}</strong><br>
      Rp${item.price.toLocaleString("id-ID")} x 
      <button onclick="decreaseQty(${index})">➖</button>
      ${item.quantity}
      <button onclick="increaseQty(${index})">➕</button><br>
      Subtotal: Rp${(item.price * item.quantity).toLocaleString("id-ID")}
    `;
    cartItemsDiv.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  const totalDiv = document.getElementById("cart-total");
  if (totalDiv) {
    totalDiv.innerText = `Total: Rp${total.toLocaleString("id-ID")}`;
  }
}

function increaseQty(index) {
  cart[index].quantity++;
  saveCart();
  renderCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
}

function checkout() {
  alert("Transaksi palsu berhasil 🎉");
  cart = []; // Kosongkan cart setelah checkout
  saveCart(); // Kosongkan dari localStorage juga
  renderCart();
}

window.onload = () => {
  loadCart();
  renderCart();
};

document.addEventListener("mousedown", function (e) {
  const cartSidebar = document.querySelector(".cart-sidebar");
  const cartButton = document.querySelector(".cart-btn");

  // Jangan tutup kalau klik di dalam keranjang atau tombol apapun di dalamnya
  if (!e.target.closest(".cart-sidebar") && !e.target.closest(".cart-btn")) {
    cartSidebar.classList.remove("open");
  }
});

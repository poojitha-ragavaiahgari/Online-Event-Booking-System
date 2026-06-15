// Show Event Details
function showEventDetails(eventId) {
    const eventDetails = {
        event1: "Details for Workshop",
        event2: "Details for Theatre",
        event3: "Details for Workshop",
        event4: "Details for Technical Conference",
        event5: "Details for Art Exhibition",
        event6: "Details for Food Festivals",
        event7: "Details for Sport Tournament",
        event8: "Details for Business Seminar",
        event9: "Details for Family Festivals",
    };

    const eventDetailsContainer = document.getElementById("eventDetails");
    if (eventDetailsContainer) {
        eventDetailsContainer.innerHTML = `
            <div class="event-detail">
                <h3>${eventDetails[eventId]}</h3>
                <p>Quality is guaranteed</p>
                <p>Description: Details about the event...</p>
                <p>For more details, please contact us.</p>
            </div>
        `;
    }
}

// ========================
// LOGIN/SIGNUP HANDLER
// ========================
function handleLoginSignup(event) {
    event.preventDefault();
    alert("Successfully logged in / signed up!");
}

// ========================
// CART MANAGEMENT
// ========================

// Add item to cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} has been added to your cart!`);
}

// Update cart count on navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Load cart items on cart page
function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cartItemsContainer) return; // In case loadCart runs on other pages

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is currently empty.</p>
                <a href="events.html" class="shop-now-btn">Browse Events</a>
            </div>
        `;
        if (cartCountElement) cartCountElement.textContent = '0';
        if (totalPriceElement) totalPriceElement.textContent = '0';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price}</div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItemDiv);
    });

    if (cartCountElement) cartCountElement.textContent = cart.length;
    if (totalPriceElement) totalPriceElement.textContent = total;
}

// Remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Checkout Action
function checkout() {
    window.location.href = "payment.html";
}

// Payment Success on Payment Page
function paymentSuccess(event) {
    event.preventDefault();

    const address = document.getElementById("address").value.trim();
    if (!address) {
        alert("Please enter a shipping address.");
        return;
    }

    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedMethod) {
        alert("Please select a payment method.");
        return;
    }

    const method = selectedMethod.value;

    if (method === "credit-card" || method === "debit-card") {
        const cardNumber = document.getElementById("card-number")?.value.trim();
        const cardExpiry = document.getElementById("card-expiry")?.value.trim();
        const cvv = document.getElementById("cvv")?.value.trim();

        const cardNumberRegex = /^\d{12,19}$/; // allows 12 to 19 digit numbers
        const cvvRegex = /^\d{3}$/;

        if (!cardNumber || !cardExpiry || !cvv) {
            alert("Please fill out all card details.");
            return;
        }

        if (!cardNumberRegex.test(cardNumber)) {
            alert("Invalid card number. Please enter 12-19 digits only.");
            return;
        }

        if (!cvvRegex.test(cvv)) {
            alert("Invalid CVV. It should be exactly 3 digits.");
            return;
        }

    } else if (method === "upi") {
        const upiId = document.getElementById("upi-id")?.value.trim();
        const upiRegex = /^[\w.\-]+@[\w.\-]+$/;

        if (!upiId) {
            alert("Please enter your UPI ID.");
            return;
        }

        if (!upiRegex.test(upiId)) {
            alert("Invalid UPI ID format. Example: yourname@bank");
            return;
        }
    }

    alert("Payment successful! Thank you for booking with EventX.");
    localStorage.removeItem("cart");
    updateCartCount();
    setTimeout(() => {
        window.location.href = "homepage.html";
    }, 2000);
}

function showPaymentFields(method) {
    const fieldsContainer = document.getElementById("payment-fields");

    let html = "";

    if (method === "credit-card" || method === "debit-card") {
        html = `
            <label for="card-number">Card Number:</label>
            <input type="text" id="card-number" required><br>

            <label for="card-expiry">Expiry Date:</label>
            <input type="month" id="card-expiry" required><br>

            <label for="cvv">CVV:</label>
            <input type="password" id="cvv" maxlength="3" required><br>
        `;
    } else if (method === "upi") {
        html = `
            <label for="upi-id">UPI ID:</label>
            <input type="text" id="upi-id" required><br><br>

            <label>Scan to Pay:</label><br>


            <img src="https://qph.cf2.quoracdn.net/main-qimg-6f10dcab91fe9a768c8757381a98e9ae-pjlq" 
                alt="UPI QR Code" style="width:200px; height:auto;"><br>
            <small>Scan this code using any UPI app (e.g., GPay, PhonePe)</small><br>
        `;
    }

    fieldsContainer.innerHTML = html;
}


// ========================
// CONTACT FORM SUBMISSION
// ========================
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadCart(); // Important: only loads if cart-items div exists
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Your message has been sent successfully!');
            contactForm.reset();
        });
    }
});
let slideIndex = 0;

function showSlides() {
  let i;
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block"; 
if(dots.length>0){ 
  dots[slideIndex-1].className += " active";
}

  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function plusSlides(n) {
  slideIndex += n;
  if (slideIndex > document.getElementsByClassName("slide").length) {
    slideIndex = 1;
  }
  if (slideIndex < 1) {
    slideIndex = document.getElementsByClassName("slide").length;
  }
  showSlides();
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

  showSlides(); // Start slideshow automatically
  updateCartCount(); // Update cart count
  loadCart();       // Load cart items
});

function searchEvents() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!query) {
        alert("Please enter something to search.");
        return;
    }
    alert("Searching for: " + query);
    // You can later redirect or filter dynamically
    // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

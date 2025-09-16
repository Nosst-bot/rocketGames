export const cart = [];

export function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.cantidad += 1;
  } else {
    item.cantidad = 1;
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCounter()
}

export function addQuantity(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cart.find(i => i.id === itemId);

  if (item) {
    item.cantidad += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    window.location.reload();
  }
}

export function subtractQuantity(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cart.find(i => i.id === itemId);

  if (item) {
    if (item.cantidad > 1) {
      item.cantidad -= 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCounter();
      window.location.reload();
    }
  }
}


export function removeFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) return;

  cart = cart.filter(item => item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCounter();
  window.location.reload();
}

export function getCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart.reduce((total, item) => total + item.cantidad, 0);
}

export function updateCartCounter() {
  const cartCounter = document.getElementById('cartCounter');
  if (cartCounter) {
    cartCounter.textContent = getCartCount();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounter();

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartContainer = document.getElementById('cartContainer');

  if (!cartContainer) {
    return;
  }

  if (cart.length === 0) {
    cartContainer.innerHTML = `
        <div class="text-center py-5">
            <h4 class="text-muted fs-3">Tu carrito está vacío 🛒</h4>
            <p class="small">Agrega productos para continuar con tu compra</p>
        </div>
    `;
  } else {
    cartContainer.innerHTML = `
    <div class="row g-4 align-items-start">
      <!-- Productos -->
      <div class="col-md-8">
        <h2 class="mb-4">Carrito de compras</h2>
        <div id="cartItems"></div>
      </div>

      <!-- Resumen -->
      <div class="col-md-4">
        <h2 class="mb-4">Resumen</h2>
        <div class="card shadow-sm border-0 p-3" id="cartSummary">
          <p class="d-flex justify-content-between">
            <span>Subtotal</span>
            <strong id="subtotal">$0</strong>
          </p>
          <p class="d-flex justify-content-between">
            <span>IVA (19%)</span>
            <strong id="ivaTotal">$2.990</strong>
          </p>
          <hr>
          <p class="d-flex justify-content-between fs-5">
            <span>Total</span>
            <strong id="cartTotal">$0</strong>
          </p>
          <button class="btn btn-success w-100 mt-3 d-inline-flex align-items-center justify-content-center" id="pagarButton">Pagar ahora<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle text-white ms-2" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                </svg>
          </button>
          <button id="clearCartButton"
            class="btn btn-outline-danger w-100 mt-2 d-inline-flex align-items-center gap-2 justify-content-center">
            Vaciar carrito<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x" viewBox="0 0 16 16">
                    <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
          </button>
        </div>
      </div>
    </div>
  `;

    const cartItems = document.getElementById("cartItems");
    const ivaSpan = document.getElementById('ivaTotal');
    const subTotalSpan = document.getElementById('subtotal');
    const cartTotalSpan = document.getElementById('cartTotal');

    let ivaTotal = 0;
    let subTotal = 0;
    let cartTotal = 0;

    cart.forEach(item => {
      const itemHTML = `
      <div class="card mb-3 shadow-sm border-0">
        <div class="row g-0 align-items-center py-2">
          <!-- Imagen -->
          <div class="col-3 col-md-2 text-center">
            <img src="${item.imagen}" class="img-fluid cart-img" alt="${item.nombre}">
          </div>

          <!-- Info -->
          <div class="col-6 col-md-7">
            <div class="card-body py-2">
              <h6 class="card-title mb-1">${item.nombre}</h6>
              <p class="text-muted mb-1 small">Precio: <strong>$${Number(item.precio).toLocaleString('es-CL')}</strong></p>
              <p class="small text-secondary mb-0">Cantidad: ${item.cantidad}</p>
            </div>
          </div>

          <!-- Acciones -->
          <div class="col-3 col-md-3 d-flex flex-row justify-content-end align-items-center gap-2 p-2">
            <button class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center py-2 data-plus" value="${item.id}"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
            </svg></button>
            <button class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center py-2 data-minus" value="${item.id}"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                </svg></button>
                <button class="btn btn-outline-danger btn-sm d-inline-flex align-items-center justify-content-center py-2 data-id" value="${item.id}">
         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </button>
          </div>
        </div>
      </div>
    `;
      cartItems.innerHTML += itemHTML;

      subTotal += item.precio * item.cantidad;
    });

    ivaTotal = (subTotal * 0.19).toFixed(0);

    subTotalSpan.textContent = `$${subTotal.toLocaleString('es-CL')}`;
    ivaSpan.textContent = `$${Number(ivaTotal).toLocaleString('es-CL')}`;
    cartTotal = subTotal + Number(ivaTotal);
    cartTotalSpan.textContent = `$${cartTotal.toLocaleString('es-CL')}`;

  }

  //Funcionlidades de los botones
  const clearCartButton = document.getElementById('clearCartButton');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      localStorage.removeItem('cart');
      updateCartCounter();
      location.reload();
    });
  }

  const removeButtons = document.querySelectorAll('.data-id');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.getAttribute('value'));
      removeFromCart(itemId);
    })
  })

  const addButtons = document.querySelectorAll('.data-plus');
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.getAttribute('value'));
      addQuantity(itemId);
    })
  });

  const subtractButtons = document.querySelectorAll('.data-minus');
  subtractButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.getAttribute('value'));
      subtractQuantity(itemId);
    })
  });

  // Popup de pago
  setTimeout(() => {
    const payButton = document.getElementById('pagarButton');
    if (payButton) {
      payButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('cart');
        updateCartCounter();
        // Crear modal si no existe
        let paymentModal = document.getElementById('paymentModal');
        if (!paymentModal) {
          paymentModal = document.createElement('div');
          paymentModal.id = 'paymentModal';
          paymentModal.className = 'modal fade';
          paymentModal.tabIndex = -1;
          paymentModal.innerHTML = `
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">¡Pago realizado!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <p>Tu compra ha sido procesada y recibirás la información en tu correo electrónico.</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Aceptar</button>
                  </div>
                </div>
              </div>
            `;
          document.body.appendChild(paymentModal);
        }
        // Mostrar modal con Bootstrap
        if (window.bootstrap && window.bootstrap.Modal) {
          const modalInstance = new bootstrap.Modal(paymentModal);
          modalInstance.show();
          paymentModal.addEventListener('hidden.bs.modal', () => {
            location.reload();
          }, { once: true });
        } else {
          // Fallback simple si Bootstrap no está disponible
          alert('¡Pago realizado! Tu compra ha sido procesada y recibirás la información en tu correo electrónico.');
          location.reload();
        }
      });
    }
  }, 500);


  const cartActions = document.getElementById('cartActions');
  if (cartActions) {
    cartActions.style.display = 'flex';
    if (getCartCount() === 0) {
      cartActions.style.display = 'none';
    }
  }
})
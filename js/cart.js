export const cart = [];

export function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingItem = cart.find(i => i.id === item.id);

    if (existingItem) {
        existingItem.cantidad += 1;
        console.log(existingItem.cantidad);
        console.log("El item ya está. se ha aumentado la cantidad.");
    } else {
        item.cantidad = 1;
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCounter()
}

export function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) return;

    let item = cart.find(item => item.id === itemId);
    if (!item) return;

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
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('card', 'mb-2', 'shadow-sm', 'border-0'); // menos margin
            itemDiv.innerHTML = `
            
        <div class="row g-0 align-items-center">
            <!-- Imagen del producto -->
            <div class="col">
            <div class="col-2 text-center">
            <!-- ICONO/IMAGEN AQUÍ -->
            <div class="bg-light rounded p-2">
            <img src="${item.imagen}" class="img-fluid img-thumbnail" style="max-height: 50px;" alt="${item.nombre}">
            </div>
            </div>
            
            <!-- Info del producto -->
            <div class="col-6">
            <div class="card-body py-2 px-2">
            <h6 class="card-title mb-0">${item.nombre}</h6>
            <p class="text-muted mb-0 small">Precio: <strong>$${item.precio}</strong></p>
            <p class="small text-secondary mb-0">Cantidad: ${item.cantidad}</p>
            </div>
            </div>
            
            <!-- Acciones -->
            <div class="col-4 d-flex flex-row justify-content-end align-items-center gap-1 p-2">
            <button class="btn btn-outline-danger btn-sm py-1 px-2">
            <!-- ICONO BASURA AQUÍ --> Eliminar
            </button>
            <button class="btn btn-outline-secondary btn-sm py-1 px-2">
            <!-- ICONO MENOS AQUÍ --> -
            </button>
            <button class="btn btn-outline-secondary btn-sm py-1 px-2">
            <!-- ICONO MÁS AQUÍ --> +
            </button>
            </div>
            </div>
            </div>
    `;
            cartContainer.appendChild(itemDiv);
        });
    }
    console.log(cart);
});

const clearCartButton = document.getElementById('clearCartButton');
if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        location.reload();
    });
}

const cartActions = document.getElementById('cartActions');
if (cartActions) {
    cartActions.style.display = 'flex';
    if (getCartCount() === 0) {
        cartActions.style.display = 'none';
    }
}
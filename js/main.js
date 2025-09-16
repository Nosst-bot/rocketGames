import { getProducts } from "./products.js";
import { addToCart } from "./cart.js";

//Sciprt para cargar los productos dinámicamente a la home page
const row = document.getElementById('productsRow');

getProducts().forEach(p => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = p.imagen;
    img.className = "card-img-top";
    img.alt = p.nombre;
    img.style.height = "530px";
    img.style.objectFit = "cover";

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = p.nombre;

    const text = document.createElement("p");
    text.className = "card-text";
    text.textContent = `${p.descripcion}`;

    const textPrecio = document.createElement("span");
    textPrecio.className = "badge bg-danger fs-5 mb-2";
    textPrecio.textContent = `$${p.precio} CLP`;

    const button = document.createElement("button");
    button.className = "btn w-100 text-white d-flex justify-content-center align-items-center gap-2";
    button.style.backgroundColor = "#171321";
    button.innerHTML = `
  <span>Agregar al carrito</span>
<svg class="ms-1" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
</svg>
`;

    const toastElement = document.getElementById('cartToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement);
    const toastProductName = document.getElementById('cartToastProductName');

    button.addEventListener('click', () => {
        addToCart(p);
        toastProductName.textContent = p.nombre;
        toastBootstrap.show();
    });

    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(textPrecio);
    body.appendChild(button);
    card.appendChild(img);
    card.appendChild(body);
    col.appendChild(card);
    row.appendChild(col);
});
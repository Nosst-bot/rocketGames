import { addToCart } from "./cart.js";

const products = [
    {
        id: 1,
        nombre: "Hollow Knight: Silksong",
        precio: 7990,
        descripcion: "Secuela del aclamado Hollow Knight. Los jugadores controlan a Hornet en un reino desconocido lleno de desafíos y secretos.",
        imagen: "assets/Silksong_cover.webp",
        categoria: ["Acción", "Aventura", "Indie"],
        plataforma: ["PC", "Playstation", "Xbox", "Nintendo Switch"],
        cantidad: 1,
    },
    {
        id: 2,
        nombre: "Elden Ring",
        precio: 49990,
        descripcion: "Un épico RPG de acción de mundo abierto de FromSoftware y George R.R. Martin, lleno de jefes desafiantes y misterios.",
        imagen: "assets/EldenRing_cover.jpg",
        categoria: ["Acción", "RPG", "Mundo Abierto"],
        plataforma: ["PC", "Playstation", "Xbox"],
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "Celeste",
        precio: 5990,
        descripcion: "Un desafiante juego indie de plataformas sobre la superación personal mientras escalas la montaña Celeste.",
        imagen: "assets/Celeste_cover.png",
        categoria: ["Plataformas", "Indie", "Aventura"],
        plataforma: ["PC", "Playstation", "Xbox", "Nintendo Switch"],
        cantidad: 1,
    },
    {
        id: 4,
        nombre: "The Legend of Zelda: Breath of the Wild",
        precio: 39990,
        descripcion: "Explora libremente el vasto reino de Hyrule en esta innovadora entrega de la saga Zelda.",
        imagen: "assets/BreathOfTheWild_cover.webp",
        categoria: ["Acción", "Aventura", "Mundo Abierto"],
        plataforma: ["Nintendo Switch", "Wii U"],
        cantidad: 1,
    },
    {
        id: 5,
        nombre: "Stardew Valley",
        precio: 6990,
        descripcion: "Simulador de granja y vida rural, donde puedes cultivar, criar animales, pescar y formar relaciones.",
        imagen: "assets/StardewValley_cover.png",
        categoria: ["Simulación", "Indie", "RPG"],
        plataforma: ["PC", "Playstation", "Xbox", "Nintendo Switch", "Móvil"],
        cantidad: 1,
    },
    {
        id: 6,
        nombre: "God of War: Ragnarök",
        precio: 59990,
        descripcion: "Kratos y Atreus continúan su viaje en los Nueve Reinos enfrentándose a dioses nórdicos.",
        imagen: "assets/GodOfWarRagnarok_cover.webp",
        categoria: ["Acción", "Aventura", "RPG"],
        plataforma: ["Playstation", "PC"],
        cantidad: 1,
    },
    {
        id: 7,
        nombre: "Cuphead",
        precio: 9990,
        descripcion: "Juego de plataformas y disparos con estética de dibujos animados de los años 30 y dificultad elevada.",
        imagen: "assets/Cuphead_cover.webp",
        categoria: ["Plataformas", "Acción", "Indie"],
        plataforma: ["PC", "Xbox", "Playstation", "Nintendo Switch"],
        cantidad: 1,
    },
    {
        id: 8,
        nombre: "Undertale",
        precio: 4990,
        descripcion: "RPG indie único donde tus decisiones importan y puedes ser pacifista o agresivo.",
        imagen: "assets/Undertale_cover.jpg",
        categoria: ["RPG", "Indie", "Aventura"],
        plataforma: ["PC", "Playstation", "Nintendo Switch"],
        cantidad: 1,
    },
    {
        id: 9,
        nombre: "Red Dead Redemption 2",
        precio: 39990,
        descripcion: "Un épico western de mundo abierto con una historia cinematográfica y detallado mundo vivo.",
        imagen: "assets/RDR2_cover.jpg",
        categoria: ["Acción", "Aventura", "Mundo Abierto"],
        plataforma: ["PC", "Playstation", "Xbox"],
        cantidad: 1,
    },
    {
        id: 10,
        nombre: "Minecraft",
        precio: 19990,
        descripcion: "Juego de construcción y supervivencia en un mundo abierto hecho de bloques infinitos.",
        imagen: "assets/Minecraft_cover.jpeg",
        categoria: ["Sandbox", "Supervivencia", "Creatividad"],
        plataforma: ["PC", "Consolas", "Móvil"],
        cantidad: 1,
    },
    {
        id: 11,
        nombre: "The Witcher 3: Wild Hunt",
        precio: 29990,
        descripcion: "Un RPG épico donde controlas a Geralt de Rivia en un vasto mundo lleno de monstruos y misiones.",
        imagen: "assets/Witcher3_cover.jpg",
        categoria: ["RPG", "Acción", "Aventura"],
        plataforma: ["PC", "Playstation", "Xbox", "Nintendo Switch"],
        cantidad: 1,
    },
    {
        id: 12,
        nombre: "Hades",
        precio: 12990,
        descripcion: "Roguelike de acción donde juegas como Zagreus, hijo de Hades, tratando de escapar del inframundo.",
        imagen: "assets/Hades_cover.jpg",
        categoria: ["Acción", "Roguelike", "Indie"],
        plataforma: ["PC", "Playstation", "Xbox", "Nintendo Switch"],
        cantidad: 1,
    },
    {
        id: 13,
        nombre: "Dark Souls III",
        precio: 34990,
        descripcion: "Un RPG desafiante con combates intensos, escenarios oscuros y jefes imponentes.",
        imagen: "assets/DarkSouls3_cover.jpg",
        categoria: ["Acción", "RPG", "Soulslike"],
        plataforma: ["PC", "Playstation", "Xbox"],
        cantidad: 1,
    },
    {
        id: 14,
        nombre: "Animal Crossing: New Horizons",
        precio: 34990,
        descripcion: "Crea y personaliza tu isla en este relajante simulador social.",
        imagen: "assets/ACNH_cover.jpg",
        categoria: ["Simulación", "Social", "Creatividad"],
        plataforma: ["Nintendo Switch"],
        cantidad: 1,
    },
    {
        id: 15,
        nombre: "Sekiro: Shadows Die Twice",
        precio: 39990,
        descripcion: "Juego de acción de FromSoftware ambientado en un Japón mítico con combates de samuráis.",
        imagen: "assets/Sekiro_cover.webp",
        categoria: ["Acción", "Aventura", "Soulslike"],
        plataforma: ["PC", "Playstation", "Xbox"],
        cantidad: 1,
    },
    {
        id: 16,
        nombre: "Super Mario Odyssey",
        precio: 34990,
        descripcion: "Aventura de Mario en mundos coloridos usando su gorra mágica Cappy.",
        imagen: "assets/MarioOdyssey_cover.jpg",
        categoria: ["Plataformas", "Aventura", "Familiar"],
        plataforma: ["Nintendo Switch"],
        cantidad: 1,
    },
    {
        id: 17,
        nombre: "Dead Cells",
        precio: 9990,
        descripcion: "Roguelike de acción y plataformas con combates fluidos y rejugabilidad infinita.",
        imagen: "assets/DeadCells_cover.jpg",
        categoria: ["Acción", "Plataformas", "Roguelike"],
        plataforma: ["PC", "Playstation", "Xbox", "Nintendo Switch"],
        cantidad: 1,
    },
    {
        id: 18,
        nombre: "Cyberpunk 2077",
        precio: 44990,
        descripcion: "RPG de mundo abierto futurista ambientado en Night City, con narrativa profunda y exploración.",
        imagen: "assets/Cyberpunk2077_cover.jpg",
        categoria: ["RPG", "Acción", "Mundo Abierto"],
        plataforma: ["PC", "Playstation", "Xbox"],
        cantidad: 1,
    },
    {
        id: 19,
        nombre: "Ori and the Will of the Wisps",
        precio: 14990,
        descripcion: "Hermoso juego de plataformas y aventura con una historia emotiva y animaciones fluidas.",
        imagen: "assets/Ori2_cover.jpg",
        categoria: ["Plataformas", "Aventura", "Indie"],
        plataforma: ["PC", "Xbox", "Nintendo Switch"],
        cantidad: 1,
    },
    {
        id: 20,
        nombre: "Persona 5 Royal",
        precio: 39990,
        descripcion: "Un JRPG aclamado por su estilo artístico, personajes memorables y combates estratégicos.",
        imagen: "assets/Persona5R_cover.jpg",
        categoria: ["RPG", "JRPG", "Aventura"],
        plataforma: ["Playstation", "PC", "Xbox", "Nintendo Switch"],
        cantidad: 1,
    }
];


//Sciprt para cargar los productos dinámicamente a la home page
const row = document.getElementById('productsRow');

products.forEach(p => {
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
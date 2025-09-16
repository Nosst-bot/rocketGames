import { getProducts, saveProducts } from "./products.js";

(() => {
    let products = getProducts();
    const adminTable = document.getElementById("adminTable");
    if (!adminTable) return;

    function renderTable() {
        adminTable.querySelectorAll('tbody').forEach(t => t.remove());
        const tbody = document.createElement("tbody");
        products.forEach(product => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <th scope="row">${product.id}</th>
                <td><img src="${product.imagen}" alt="${product.nombre}" class="cart-img me-3">${product.nombre}</td>
                <td class="align-middle">$${product.precio.toLocaleString('es-CL')}</td>
                <td class="align-middle">${product.stock}</td>
                <td class="align-middle">
                    <button class="btn btn-sm btn-primary me-2 data-edit" data-id="${product.id}">Editar</button>
                    <button class="btn btn-sm btn-danger data-delete" value="${product.id}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        adminTable.appendChild(tbody);
    }

    renderTable();

    adminTable.addEventListener('click', function (e) {
        if (e.target.classList.contains('data-delete')) {
            const id = Number(e.target.value);
            products = products.filter(product => product.id !== id);
            saveProducts(products);
            renderTable();
            location.reload();
        }
    });

    adminTable.addEventListener('click', function (e) {
        if (e.target.classList.contains('data-edit')) {
            const id = Number(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === id);
            if (!product) return;
            document.getElementById('editId').value = product.id;
            document.getElementById('editNombre').value = product.nombre;
            document.getElementById('editPrecio').value = product.precio;
            document.getElementById('editStock').value = product.stock;
            document.getElementById('editImagen').value = product.imagen;
            const editModal = new bootstrap.Modal(document.getElementById('editProductModal'));
            editModal.show();
        }
    });

    document.getElementById('editProductForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const id = Number(document.getElementById('editId').value);
        const nombre = document.getElementById('editNombre').value;
        const precio = Number(document.getElementById('editPrecio').value);
        const stock = Number(document.getElementById('editStock').value);
        const imagen = document.getElementById('editImagen').value;
        products = products.map(product =>
            product.id === id ? { ...product, nombre, precio, stock, imagen } : product
        );
        saveProducts(products);
        renderTable();
        bootstrap.Modal.getInstance(document.getElementById('editProductModal')).hide();
        location.reload();
    });

    document.getElementById('addProductForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('addNombre').value;
        const precio = Number(document.getElementById('addPrecio').value);
        const stock = Number(document.getElementById('addStock').value);
        const imagen = document.getElementById('addImagen').value;
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = {
            id: newId,
            nombre,
            precio,
            descripcion: '',
            imagen,
            categoria: [],
            plataforma: [],
            cantidad: 1,
            stock
        };
        products.push(newProduct);
        saveProducts(products);
        renderTable();
        bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
        location.reload();
    });
})();
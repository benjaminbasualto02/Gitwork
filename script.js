// Array para almacenar los elementos del carrito con cantidades
let carrito = [];

// Función para agregar elementos al carrito
function addItem(nombre, precio) {
    const itemIndex = carrito.findIndex(item => item.nombre === nombre);
    
    // Si el producto ya está en el carrito, incrementa su cantidad
    if (itemIndex > -1) {
        carrito[itemIndex].cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    const cartItems = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    cartItems.innerHTML = "";

    // Calcular el total y mostrar los elementos del carrito con cantidad
    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        cartItems.innerHTML += `
            <div class="d-flex justify-content-between">
                <div>
                    <span style="color: white;">${item.nombre}</span> - $${item.precio} x ${item.cantidad}
                    <button class="btn-agregar" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <button class="btn-agregar" onclick="cambiarCantidad(${index}, 1)">+</button>
                    <button class="btn-agregar" onclick="eliminarItem(${index})">Eliminar</button>
                </div>
            </div>
        `;
    });

    totalPriceElement.innerText = total.toLocaleString();
}

// Función para cambiar la cantidad de un producto en el carrito
function cambiarCantidad(index, delta) {
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1); // Elimina el producto si la cantidad es 0
    }
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarItem(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para abrir el modal de confirmación de compra
function abrirCheckout() {
    const checkoutItems = document.getElementById("checkoutItems");
    const checkoutTotal = document.getElementById("checkoutTotal");
    const emptyCartMessage = document.getElementById("emptyCartMessage");
    
    checkoutItems.innerHTML = "";

    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        checkoutItems.innerHTML += `
            <div class="d-flex justify-content-between">
                <p>${item.nombre} (x${item.cantidad})</p>
                <p>$${(item.precio * item.cantidad).toLocaleString()}</p>
            </div>
        `;
    });

    checkoutTotal.innerText = total.toLocaleString();

    // Mostrar mensaje de carrito vacío si no hay productos
    if (carrito.length === 0) {
        emptyCartMessage.classList.remove("d-none");
    } else {
        emptyCartMessage.classList.add("d-none");
    }
}

// Función para confirmar la compra (vacía el carrito y muestra modal de agradecimiento)
function confirmarCompra() {
    if (carrito.length > 0) {
        carrito = [];
        actualizarCarrito();

        // Obtener instancia del modal de checkout y cerrarlo
        const checkoutModalEl = document.getElementById('checkoutModal');
        const checkoutModal = bootstrap.Modal.getInstance(checkoutModalEl);
        checkoutModal.hide();

        // Mostrar el modal de agradecimiento después de cerrar el de checkout
        const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
        thankYouModal.show();
    } else {
        alert("El carrito está vacío.");
    }
}


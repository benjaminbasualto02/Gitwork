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
    alert(`${nombre} añadido al carrito.`);
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

        // Obtenemos la descripción correspondiente del producto
        const descripcion = obtenerDescripcion(item.nombre);
        
        cartItems.innerHTML += `
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center">
                    <p style="text-align: center; color:white"  >${item.nombre} (x${item.cantidad})</p>
                    <p style="text-align: center; color:white"  >$${(item.precio * item.cantidad).toLocaleString()}</p>
                    <div style="color: white;" >
                        <button class="btn-agregar" onclick="cambiarCantidad(${index}, -1)">-</button>
                        <button class="btn-agregar" onclick="cambiarCantidad(${index}, 1)">+</button>
                        <button class="btn-agregar" onclick="eliminarItem(${index})">Borrar</button>
                        <button class="btn-agregar" onclick="toggleDescripcion(${index})">Detalles</button>
                    </div>
                </div>
                <div id="descripcion-${index}" class="descripcion" style="display: none;">
                    <p style="text-align: center; color:white"  >${descripcion}</p>
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
// Función para abrir el modal de confirmación de compra
function abrirCheckout() {
    const checkoutItems = document.getElementById("checkoutItems");
    const checkoutTotal = document.getElementById("checkoutTotal");
    const emptyCartMessage = document.getElementById("emptyCartMessage");
    
    checkoutItems.innerHTML = "";

    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        
        // Obtenemos la descripción correspondiente del producto
        const descripcion = obtenerDescripcion(item.nombre);
        
        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <div class="d-flex justify-content-between align-items-center">
                    <p>${item.nombre} (x${item.cantidad})</p>
                    <p>$${(item.precio * item.cantidad).toLocaleString()}</p>
                </div>
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

// Función para obtener la descripción del producto
function obtenerDescripcion(nombre) {
    const descripciones = {
        'SKOOT - Gelus Custom': 'Tamaño de manga larga (cm): Talla Única <br> Longitud de cuello: 22cm <br> Longitud de la manga: 64 cm <br> Longitud: 78 cm <br> Ancho 62cm <br> - Construcción en capas en las mangas <br> - Mangas de cuadros con botones <br> - Impresión blanca.',
        'SKOOT - Harmony Longsleeve': 'Tamaño de manga larga (cm): Talla Única <br> Longitud de cuello: 22cm <br> Longitud de la manga: 64 cm <br> Longitud: 78 cm <br> Ancho 62cm <br> - Construcción en capas en las mangas <br> - Mangas de cuadros con botones <br> - Impresión negra.',
        'SKOOT - Chokehold Longsleeve': 'Tamaño de manga larga (cm): Talla Única <br> Longitud de cuello: 22cm <br> Longitud de la manga: 60 cm <br> Longitud: 74 cm <br> Ancho 63cm <br> - Construcción en capas en las mangas <br> - Abertura para el pulgar <br> - Impresión negra.',
        'KURO ARCHIEVE': 'Poleron boxy fit con hombros caigos. tela gruesa 700g. <br> Recomendaciones: Lavar con agua fría, secar a temperatura ambiente y planchar la prenda al revés. Evite el uso de secadora.',
        'Poleron_Boxy': 'Polerón boxy fit con hombros caigos. 70% algodon y 30 poliester poleron grueso 700g. <br> Recomendaciones: Lavar con agua fría, secar a temperatura ambiente y planchar la prenda al revés. Evite el uso de secadora.',
        'Poleron Chaous': 'Polerón negro con un estampado blanco con efecto evengado simulando una polera de una banda vintage. <br> Recomendaciones: Lavar con agua fría, secar a temperatura ambiente y planchar la prenda al revés. Evite el uso de secadora.<br>Una vez hecha la compra hay un plazo de 1-2 semanas para ser enviado su producto.',
        'Pantalones Denim Cargo': 'Presentamos el Denim Cargo Rust. Confeccionados con un corte holgado y un lavado intenso, estos cargos de mezclilla tienen bolsillos laterales y traseros, así como bolsillos adicionales en la parte inferior de la pierna. Están adornados con tachuelas en los bolsillos de mano y relojero. Poseen desgaste de bigotes en el área de tensión. Por último, están rematados con adornos metálicos y de eco cuero de la marca. <br> -Jeans cargo de color negro desgastado. <br> -Fit baggy. <br> -Denim 100% algodón, 13 onzas, <br> -Cierre YKK, botón en la cintura con logo, badana trasera eco cuero.',
        'Pantalon Track': 'Pantalon desmontable nylon. <br> Cordon y tanca en cintura. <br> logo FB bordado. <br> Tela nylon. <br> Fit regular. <br> Las medidas pueden variar 1cm por talla. <br> Se recomienda lavar con agua fría, secado a temperatura ambiente, usar solo plancha vapor y planchar con cuidado. Evitar uso de secadora.',
        'Jeans Cargo': 'Jeans tipo cargo color negro. <br> Algodón 100%. <br> Fit baggy. <br> Las medidas pueden variar 1cm por talla. <br> Se recomienda lavar con agua fría, secado a temperatura ambiente y planchar prenda por el revés. Evitar uso de secadoras.'
    };
    return descripciones[nombre] || 'Descripción no disponible.';
}

// Función para alternar la visibilidad de la descripción
function toggleDescripcion(index) {
    const descripcionElement = document.getElementById(`descripcion-${index}`);
    if (descripcionElement.style.display === "none") {
        descripcionElement.style.display = "block";
    } else {
        descripcionElement.style.display = "none";
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

function guardarDatosCliente() {
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const rut = document.getElementById('rut').value.trim();
    const region = document.getElementById('region').value.trim();
    const comuna = document.getElementById('comuna').value.trim();
    const address = document.getElementById('address').value.trim();

    // Validar que los campos requeridos estén llenos
    if (!fullName || !phone || !rut || !region || !comuna || !address) {
        alert("Por favor, ingrese sus datos.");
        return false; // Detener la función si faltan datos
    }

    // Si todos los campos están llenos, guardar los datos
    const customerData = {
        fullName,
        phone,
        rut,
        region,
        comuna,
        address,
        addressReference: document.getElementById('addressReference').value.trim(),
        postalCode: document.getElementById('postalCode').value.trim()
    };

    console.log("Datos del cliente:", customerData); // Aquí puedes manejar el envío de datos

    // Cerrar el modal después de guardar los datos
    const customerInfoModalEl = document.getElementById('customerInfoModal');
    const customerInfoModal = bootstrap.Modal.getInstance(customerInfoModalEl);
    customerInfoModal.hide();

    alert("Información de cliente guardada exitosamente.");

    return true; // Indicar que la función se ejecutó correctamente
}

const regionesComunas = {
    "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Región de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Región de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Región de Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Región de Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "La Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Región Metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Estación Central", "Huechuraba", "La Cisterna", "La Florida", "La Granja", "Las Condes", "Lo Barnechea", "Lo Espejo", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Puente Alto", "Quilicura", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San Miguel", "San Ramón", "Vitacura"],
    "Región de O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Olivar", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente de Tagua Tagua"],
    "Región del Maule": ["Talca", "Cauquenes", "Colbún", "Curicó", "Empedrado", "Hualañé", "Licantén", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Javier", "Talca", "Teno", "Vichuquén"],
    "Región de Ñuble": ["Chillán", "Chillán Viejo", "El Carmen", "Pemuco", "Quillón", "San Carlos", "San Ignacio", "Yungay"],
    "Región del Bío Bío": ["Concepción", "Coronel", "Lota", "Talcahuano", "San Pedro de la Paz", "Hualpén", "Penco", "Tomé", "Santa Juana", "Chiguayante", "Florida", "Laja", "Los Ángeles", "Mulchén", "Nacimiento", "Negrete", "Quilleco", "San Rosendo", "Tucapel", "Yumbel", "Antuco", "Cabrero", "Laja", "Penco"],
    "Región de La Araucanía": ["Temuco", "Padre Las Casas", "Vilcún", "Gorbea", "Lautaro", "Pitrufquén", "Toltén", "Freire", "Teodoro Schmidt", "Curarrehue", "Villarrica", "Pucón", "Loncoche", "San José de la Mariquina", "Nueva Imperial", "Los Sauces", "Traiguén", "Lumaco", "Carahue"],
    "Región de Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli"],
    "Región de Los Lagos": ["Puerto Montt", "Puerto Varas", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Osorno", "San Pablo", "Castro", "Ancud", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quinchao"],
    "Región de Aysén": ["Coyhaique", "Aysén", "Chile Chico", "Cisnes", "Guaitecas", "Lago Verde", "Puerto Aysén", "Rio Ibáñez"],
    "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas", "Natales", "Porvenir", "Primavera", "Timaukel", "Torres del Paine", "Cabo de Hornos", "Antártica Chilena"]
};

// Función para llenar el select de regiones al cargar la página
function cargarRegiones() {
    const regionSelect = document.getElementById("region");
    for (const region in regionesComunas) {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    }
}

// Función para actualizar el select de comunas basado en la región seleccionada
function actualizarComunas() {
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");
    const comunas = regionesComunas[regionSelect.value] || [];

    // Limpiar las opciones de comuna anteriores
    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

    // Agregar las nuevas opciones de comuna
    comunas.forEach(comuna => {
        const option = document.createElement("option");
        option.value = comuna;
        option.textContent = comuna;
        comunaSelect.appendChild(option);
    });
}

// Llamar a cargarRegiones al cargar la página
document.addEventListener("DOMContentLoaded", cargarRegiones);

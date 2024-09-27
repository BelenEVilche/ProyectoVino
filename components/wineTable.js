function WineTable(onWineSelect) {
    const wineTableContainer = document.getElementById("wine-table");

    fetch(`${url}/getAll`)
        .then(response => response.json())
        .then(data => {
            const table = document.createElement("table");
            const thead = document.createElement("thead");
            const tbody = document.createElement("tbody");

            // Table headers
            const headers = ["Nombre", "Año", "Tipo", "Categoría", "Precio"];
            const trHead = document.createElement("tr");
            headers.forEach(header => {
                const th = document.createElement("th");
                th.classList.add("column-header"); // Aplica la clase aquí
                th.textContent = header;
                trHead.appendChild(th);


               
                
            
            });
            thead.appendChild(trHead);

            // Table rows
            data.forEach(wine => {
                const tr = document.createElement("tr");
                tr.style.cursor = 'pointer';
                tr.addEventListener("click", () => onWineSelect(wine.id));



                const tdName = document.createElement("td");
                tdName.textContent = wine.name;
                tdName.classList.add("celdas");

                const tdYear = document.createElement("td");
                tdYear.textContent = wine.year;
                tdYear.classList.add("celdas");

                const tdType = document.createElement("td");
                tdType.textContent = wine.type;
                tdType.classList.add("celdas");

                const tdCategory = document.createElement("td");
                tdCategory.textContent = wine.category;
                tdCategory.classList.add("celdas");
                
                const tdPrice = document.createElement("td");
                tdPrice.textContent = wine.price;
                tdPrice.classList.add("celdas");

                tr.appendChild(tdName);
                tr.appendChild(tdYear);
                tr.appendChild(tdType);
                tr.appendChild(tdCategory);
                tr.appendChild(tdPrice);
                tbody.appendChild(tr);

            });

            table.appendChild(thead);
            table.appendChild(tbody);
            wineTableContainer.appendChild(table);
        });
}

function mostrarCarrito(carro = null) {
    let dentroCarrito = document.getElementById("carrito");

    // Asegurarse de que `carro` sea un array
    if (!Array.isArray(carro)) {
        carro = JSON.parse(localStorage.getItem('carrito')) || [];
    }

    console.log("Contenido del carrito:", carro); // Mensaje de depuración

    let contenido = "<ul class='list-group list-group-flush'>";
    let precioTotal = 0;

    // Asegúrate de que `carro` ahora es un array antes de usar forEach
    if (Array.isArray(carro)) {
        carro.forEach(vino => {
            precioTotal += parseFloat(vino.price);        
            contenido +=
            `<li class="list-group-item">${vino.name}. ${vino.type} del ${vino.year} - <b>$${vino.price}</b>
            <button type="button" class="btn-close" aria-label="Close" value="${vino.id}"></button>
            </li>`;
        });
    }

    const precioTotalFormateado = precioTotal.toLocaleString('es-AR');
    contenido += `<li class="list-group-item finalLista">Precio Total: $${precioTotalFormateado}</li></ul>`;
    dentroCarrito.innerHTML = contenido;

    // Botones para eliminar vinos del carrito
    dentroCarrito.querySelectorAll('.btn-close').forEach(button => {
        button.addEventListener('click', () => {
            console.log(`Intentando eliminar el vino con ID: ${button.value}`); 
            eliminarDelCarrito(button.value);
        });
    });
}
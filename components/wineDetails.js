function WineDetails(wineId) {
    const wineDetailsContainer = document.getElementById("wine-details");
    wineDetailsContainer.innerHTML = ""; // Limpiar contenido anterior

    if (wineId) {
        fetch(`${url}/getWine?id=${wineId}`)
            .then(response => response.json())
            .then(data => {
                const wineDetails = document.createElement("div");

                const h2 = document.createElement("h2");
                h2.textContent = "Enología:";
                wineDetails.appendChild(h2);

                if (data.photo) {
                    const img = document.createElement("img");
                    img.src = `data:image/jpeg;base64,${data.photo}`;
                    img.alt = data.name;
                    img.style.width = "120px";
                    img.style.height = "176px";
                    wineDetails.appendChild(img);
                }

                const h3 = document.createElement("h3");
                h3.textContent = data.name;
                wineDetails.appendChild(h3);

                const pType = document.createElement("p");
                pType.textContent = `Tipo: ${data.type}`;
                wineDetails.appendChild(pType);

                const pYear = document.createElement("p");
                pYear.textContent = `Año: ${data.year}`;
                wineDetails.appendChild(pYear);

                const pRegion = document.createElement("p");
                pRegion.textContent = `Región: ${data.region}`;
                wineDetails.appendChild(pRegion);

                const pAlcohol = document.createElement("p");
                pAlcohol.textContent = `Alcohol: ${data.alcoholPercentage}%`;
                wineDetails.appendChild(pAlcohol);

                // Crear botón "Vender"
                const sellButton = document.createElement("button");
                sellButton.textContent = "Vender";
                sellButton.classList.add("button", "button-green"); // Agregar clases
                sellButton.style.marginTop = "20px"; // Espacio adicional para el botón

                // Modificar la función de añadir al carrito
                sellButton.addEventListener("click", () => {
                    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                    
                    // Añadir el vino seleccionado al carrito
                    carrito.push({
                        id: data.id,
                        name: data.name,
                        year: data.year,
                        type: data.type,
                        price: data.price
                    });

                    // Actualizar el carrito en localStorage
                    localStorage.setItem('carrito', JSON.stringify(carrito));

                    // Mostrar el carrito actualizado
                    mostrarCarrito(carrito);
                });

                // Agregar el botón al contenedor de detalles
                wineDetails.appendChild(sellButton);
                wineDetailsContainer.appendChild(wineDetails);
            });
    } else {
        const p = document.createElement("p");
        p.textContent = "Selecciona un vino para ver los detalles.";
        wineDetailsContainer.appendChild(p);
    }
}
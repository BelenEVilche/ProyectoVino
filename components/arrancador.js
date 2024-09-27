let selectedWineId = null;

function handleWineSelect(id) {
    selectedWineId = id;
    WineDetails(selectedWineId);
}

document.addEventListener("DOMContentLoaded", function() {
    WineTable(handleWineSelect);
    mostrarCarrito(); // Mostrar el carrito al cargar la página
});
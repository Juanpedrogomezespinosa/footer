"use strict";

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("oculto");
}

function cerrarMenu() {
  const menu = document.getElementById("menu");
  menu.classList.add("oculto");
}

//funciones para el carrito de la compra
const productos = document.querySelectorAll(".producto");
const subtotalEl = document.getElementById("subtotal");
const impuestosEl = document.getElementById("impuestos");
const totalEl = document.getElementById("total");
const botonComprar = document.getElementById("boton-comprar");

function calcularTotales() {
  let subtotal = 0;
  let algunSeleccionado = false;

  productos.forEach((prod) => {
    const checkbox = prod.querySelector(".seleccionar-producto");
    const precio = parseFloat(
      prod.querySelector(".precio-producto").dataset.precio
    );
    const cantidad =
      parseInt(prod.querySelector(".cantidad-producto").value) || 0;

    if (checkbox.checked && cantidad > 0) {
      algunSeleccionado = true;
      subtotal += precio * cantidad;
    }
  });

  const impuestos = subtotal * 0.21; // 21% IVA
  const total = subtotal + impuestos;

  // Formatear a euros con coma decimal
  const formatoEuros = (num) => num.toFixed(2).replace(".", ",") + " €";

  subtotalEl.textContent = formatoEuros(subtotal);
  impuestosEl.textContent = formatoEuros(impuestos);
  totalEl.textContent = formatoEuros(total);

  botonComprar.disabled = !algunSeleccionado;
}

// Eventos para recalcular
productos.forEach((prod) => {
  prod
    .querySelector(".seleccionar-producto")
    .addEventListener("change", calcularTotales);
  prod
    .querySelector(".cantidad-producto")
    .addEventListener("input", calcularTotales);
});

// Calcular al cargar
calcularTotales();

// Opcional: manejo del envío (ejemplo)
document.getElementById("carrito-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (botonComprar.disabled) return;
  alert("Gracias por su compra. ¡Procesando pedido!");
  // Aquí se implementaría la lógica real de compra
});

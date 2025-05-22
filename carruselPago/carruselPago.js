"use strict";
// Funciones del menú
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("oculto");
}

function cerrarMenu() {
  const menu = document.getElementById("menu");
  menu.classList.add("oculto");
}

document.addEventListener("DOMContentLoaded", () => {
  const pasos = document.querySelectorAll(".paso");
  const btnPrev = document.getElementById("prev-btn");
  const btnNext = document.getElementById("next-btn");
  const form = document.getElementById("form-pago");
  const resumenCompra = document.getElementById("resumen-compra");

  let pasoActual = 0;

  function mostrarPaso(index) {
    pasos.forEach((paso, i) => {
      paso.classList.toggle("paso-activo", i === index);
    });

    btnPrev.disabled = index === 0;
    btnNext.textContent =
      index === pasos.length - 1 ? "Confirmar" : "Siguiente";

    if (index === pasos.length - 1) {
      generarResumen();
    }
  }

  function generarResumen() {
    // Recoge datos del formulario para mostrar resumen simple
    const datos = new FormData(form);
    let html = "<ul>";
    for (const [key, value] of datos.entries()) {
      html += `<li><strong>${capitalizar(
        key.replace(/_/g, " ")
      )}:</strong> ${value}</li>`;
    }
    html += "</ul>";
    resumenCompra.innerHTML = html;
  }

  function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  btnNext.addEventListener("click", () => {
    // Validar paso actual antes de avanzar
    const inputsPaso = pasos[pasoActual].querySelectorAll("input, select");
    for (const input of inputsPaso) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
    }

    if (pasoActual < pasos.length - 1) {
      pasoActual++;
      mostrarPaso(pasoActual);
    } else {
      // Aquí podrías enviar el formulario o mostrar mensaje de éxito
      alert("Compra confirmada. ¡Gracias!");
      form.reset();
      pasoActual = 0;
      mostrarPaso(pasoActual);
    }
  });

  btnPrev.addEventListener("click", () => {
    if (pasoActual > 0) {
      pasoActual--;
      mostrarPaso(pasoActual);
    }
  });

  mostrarPaso(pasoActual);
});

"use strict";

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("oculto");
}

function cerrarMenu() {
  const menu = document.getElementById("menu");
  menu.classList.add("oculto");
}

const imagenesBio = [
  "images/tienda.jpg",
  "images/tienda2.jpg",
  "images/tienda3.jpg",
  "images/tienda4.jpg",
  "images/tienda5.jpg",
];

let indiceActual = 0;
const imagenElemento = document.getElementById("bioImagen");

function cambiarImagenBio() {
  imagenElemento.style.opacity = 0;

  setTimeout(() => {
    indiceActual = (indiceActual + 1) % imagenesBio.length;
    imagenElemento.src = imagenesBio[indiceActual];

    imagenElemento.style.opacity = 1;
  }, 500);
}

setInterval(cambiarImagenBio, 5000);

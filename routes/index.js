// Archivo dedicado a las Rutas del sitio web

import express from "express";
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje,
} from "../controllers/paginasController.js";
import guardarTestimonial from "../controllers/testimonialController.js";

const router = express.Router();

// Verbos de HTTP en este archivo: .get y .post
// Con la petición .get podemos adquirir una URL... una diagonal vacía (/) es la página de inicio, una diagonal seguida de alguna palabra (ej: /contacto) es una sub-página...


// Página de 'Inicio'
// La URL local sería: http://localhost:4000/
router.get("/", paginaInicio);


// Sub-Página de 'Nosotros'
// La URL local sería: http://localhost:4000/nosotros
router.get("/nosotros", paginaNosotros);


// Sub-Página de 'Viajes'
// La URL local sería: http://localhost:4000/viajes
router.get("/viajes", paginaViajes);
router.get("/viajes/:viajeSlug", paginaDetalleViaje);


// Sub-Página de 'Testimoniales'
// La URL local sería: http://localhost:4000/testimoniales
router.get("/testimoniales", paginaTestimoniales);
// La petición tipo .post es porque se estará 'posteando' (enviando) los datos del formulario a la Base de Datos.
router.post("/testimoniales", guardarTestimonial);


export default router;

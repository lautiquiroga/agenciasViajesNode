// Patrón de diseño 'Model View Controller'

// Este archivo es el Controller (controlador), porque conecta al Model con el View.

// Lo que está dentro de la función, es a lo que se le llama 'Model', ya que se encarga de los datos obtenidos de la respuesta de express ('res')*. Con dichos datos, se ejecuta el método '.render', para poder visualizar la página (View).


import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {

    // Consultar 3 viajes y 3 testimoniales
    const promises = []; // en el index 0 estarán los viajes y en el index 1 estarán los testimoniales
    promises.push(Viaje.findAll({
        limit: 3
    }));
    promises.push(Testimonial.findAll({
        limit: 3
    }));


    try {
        const resultado = await Promise.all(promises);

        // .render busca el archivo que le pasemos entre comillas (el archivo debe estar en la carpeta 'views'), e imprime en pantalla el html de dicho archivo
        res.render("inicio", {
            viajes: resultado[0],
            testimoniales: resultado[1],
            clase: 'home',
            page: "Inicio", // exportar una variable
        });
    } catch (error) {
        console.log(error);
    }
};


const paginaNosotros = (req, res) => {
    res.render("nosotros", {
        pagina: "Nosotros", // exportar una variable
    });
};


// La página /viajes consulta una Base de Datos
const paginaViajes = async (req, res) => {
    try {
        // Consultar Base de Datos
        const viajes = await Viaje.findAll();

        res.render("viajes", {
            pagina: "Viajes", // exportar una variable
            viajes, // exportar la consulta de la base de datos
        });
    } catch (error) {
        console.log(error);
    }

};


// La página /testimoniales consulta una Base de Datos
const paginaTestimoniales = async (req, res) => {
    try {
        // Consultar Base de Datos
        const testimoniales = await Testimonial.findAll();

        res.render("testimoniales", {
            testimoniales, // exportar la consulta de la base de datos
            page: "Testimoniales", // exportar una variable
        });
    } catch (error) {
        console.log(error);
    }

};


// Mostrar un viaje por su slug (slug: Fragmento de texto único en una URL)
const paginaDetalleViaje = async (req, res) => {

    const { viajeSlug } = req.params;
    // 'viajeSlug' viene como "parámetro" en la ejecución de 'paginaDetalleViaje' en el archivo index.js de la carpeta routes

    try {
        const resultado = await Viaje.findOne({ where: { slug: viajeSlug } });

        res.render('viaje', {
            pagina: 'Información Viaje',
            resultado
        })
    } catch (error) {
        console.log(error);
    }
};


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje,
};

// * 'req' (request) es lo que el programador envía, 'res' (response) es lo que Express devuelve.

import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {
    // Validar formulario...
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if (nombre.trim() === "") {
        errores.push({ mensaje: "nombre vacio" });
    }
    if (correo.trim() === "") {
        errores.push({ mensaje: "correo vacio" });
    }
    if (mensaje.trim() === "") {
        errores.push({ mensaje: "mensaje vacio" });
    }

    if (errores.length) {
        // Consultar Base de Datos
        const testimoniales = await Testimonial.findAll();

        res.render("testimoniales", {
            // Mostrar la vista con errores
            pagina: "Testimoniales",
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        // Almacenar en la Base de Datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje,
            });
            res.redirect("/testimoniales");
        } catch (error) {
            console.log(error);
        }
    }
};

export default guardarTestimonial;

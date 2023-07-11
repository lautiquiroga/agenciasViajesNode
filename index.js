// Archivo dedicado a la importación de express y la creación del puerto
// El orden del código es importante... Debe estar como en este archivo

// Empezar servidor: en la terminal integrada escribir 'npm run dev'


// Importar express
import express from 'express';
// Importar Rutas (sí o sí con el nombre del archivo y la extensión)
import router from './routes/index.js';
// Importar la Base de Datos de SQL
import db from './config/db.js';

// Ejecutar express en una variable
const app = express();

// Conectar la Base de Datos de SQL
db.authenticate()
    .then(() => console.log('Base de Datos conectada'))
    .catch(error => console.log(error))

// Definir puerto -->  deploy || local
const port = process.env.PORT || 4000;

// Habilitar PUG (es un Template Engine, es para visualizar elementos html)
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    return next();
});

// Agregar 'body parser' para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Habilitar la carpeta 'public'
app.use(express.static('public'));

// Agregar Rutas 
app.use('/', router);

// "Escuchar" el puerto
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
})



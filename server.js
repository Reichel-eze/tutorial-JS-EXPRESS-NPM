/* Del mismo modo que importamos módulos dentro de nuestro mismo proyecto, 
en Node JS las dependencias se importan usando ‘require’.
*/

// ------ IMPORTACION DE MODULOS ------

const express = require('express')                  // importa el framework de Express
const { engine } = require('express-handlebars');   // motor de plantillas para generar HTML dinámico.

// ------ IMPORTACION DE CONTROLADORES ------
// (que contienen la lógica para manejar ciertas rutas. Vista de bienvenida y despedida)

const HomeController = require('./controllers/home.controller');
const SaludoController = require('./controllers/saludo.controller');

// ------ INICIALIZACION DE LAS APP ------

const app = express()   // Se crea una instancia de la aplicación Express.
const port = 9000;      // El puerto en que nuestro servidor "escuchara" los pedidos/peticiones HTTP

// ----- CONFIGURACION de Handlebars como el motor de plantillas -----

app.engine('hbs', engine({ defaultLayout: false })); // Se configura Handlebars (.hbs) como motor de vistas.
                                                     // defaultLayout: false indica que no se usará un "layout" general por defecto.
app.set('view engine', 'hbs'); // views es el directorio donde estarán las plantillas .hbs
app.set('views', './views');

// ------ ROUTER Y CONTROLADORES ------ 

const router = express.Router(); // Se crea un router (manejador de rutas).

// Instanciaremos los controladores que manejaran las distintas rutas del servidor
const homeController = new HomeController();
const saludoController = new SaludoController();

// ------ DEFINICION DE RUTAS ------ 
// Reemplazaremos las lambdas por referencias a los métodos correspondientes:  

// '/' → Llama al método index de HomeController.
// /bienvenida → Llama al método bienvenida de SaludoController.
// /despedida → Llama al método despedida de SaludoController.

router.get('/', (req, res) => homeController.index(req, res));  
router.get('/bienvenida', (req, res) => saludoController.bienvenida(req, res));
router.get('/despedida', (req, res) => saludoController.despedida(req, res));

app.use('/', router); // le dice a la app que use este router para manejar las rutas desde la raíz.

// La respuesta que dará cuando recibamos un pedido al recurso /, también conocido como la raíz.
// Redirigir la ruta raíz a '/bienvenida'
//app.get('/', (req, res) => {
//    res.redirect('/bienvenida');
//});

// Ruta que renderiza la plantilla 'bienvenida'
// Ruta '/bienvenida' que renderiza la plantilla 'bienvenida'
//app.get('/', (req, res) => {
//    const nombre = req.query.nombre || 'Mundo';
//    res.render('bienvenida' , {nombre});
    //res.send(`
    //    <h1>¡Hola ${nombre}!</h1>
    //    <p>Esta es nuestra primera respuesta HTML</p>
    //`);
//});

// Ruta '/despedida' que renderiza la plantilla 'despedida'
//app.get('/despedida', (req, res) => {
//    const nombre = req.query.nombre || 'Mundo';
//    res.render('despedida', { nombre });
//});
  
// ------ INICIO DE SERVIDOR ------ 

// Inicia el servidor en el puerto 9000.
// Muestra en consola una confirmación de que el servidor está corriendo.

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Para iniciar el server deberemos ejecutar el siguiente comando en nuestra computadora, utilizando el comando:
// PARA INICIAR EL SERVIDOR --> $ node server.js
// PARA DETENER EL SERVIDOR --> Ctrl + C


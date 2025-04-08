// resolverá la ruta raíz

class HomeController {
    
    // Este método se ejecuta cuando se recibe una petición GET a la ruta / (la raíz del sitio).
    index(req, res) {
        res.redirect('/bienvenida'); // para redirigir automáticamente al usuario a la ruta /bienvenida.    
    }
    // Es como decir: “Cuando alguien entra a la página principal, mandalo directamente a la página de bienvenida.
}

module.exports = HomeController; // Esto permite que esta clase pueda ser importada y utilizada en otros archivos del proyecto
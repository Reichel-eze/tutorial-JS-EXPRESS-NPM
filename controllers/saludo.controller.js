// resolverá las rutas de bienvenida y despedida

class SaludoController {
    
    // Este método lee el parámetro nombre que puede venir en la URL, por ejemplo:
    // http://localhost:9000/bienvenida?nombre=Pepe
    // Si no se pasa ningún nombre, se usa 'Mundo' como valor por defecto.
    // Se hace para evitar repetir lógica en cada método.
    leerNombre(req) {
        return req.query.nombre || 'Mundo';
    }
    
    bienvenida(req, res) {
        const nombre = this.leerNombre(req);
        res.render('bienvenida', { nombre });
    }

    despedida(req, res) {
        const nombre = this.leerNombre(req);
        res.render('despedida', { nombre });
    }
}

module.exports = SaludoController
// ENTIDADES: Producto, Descuento, Carrito

//domain.js: incluye las clases que describen al modelo de objetos

//funciones.js: incluye las funciones que se piden en el enunciado

//index.js: incluye el código para ejecutar las funciones y probarlas

// Para escribir el prototipo
//function Producto(precio, nombre) { // funcion constructura
//    this.nombre = nombre    // this seria un self
//    this.precio = precio
//}

// Variables
let producto1 = "asdasdsa"  // let tiene alcance a nivel bloque
producto1 = 8
//console.log(producto1) // para imprimir por consola
// En el caso de las variables si se puede volver a asignar 

// function unaFuncion() {
//     {
//         let variableDentroDeBloque = "Hola Mundo"
//     }
//     console.log(variableDentroDeBloque) // Esto da error
// }


// Constantes
//const producto2 = new Producto(10, "Coca")
// producto2 = "asadsad"   // Esto daria un ERROR porque es una constante, por lo tanto NO puedo volver a ReAsignarla

// Se incluyeron las clases!!

class Producto {
    
    #precioBase;    // Atributo PRIVADO (NO se puede acceder directamente a dicho atributo, tengo que....)
    
    constructor(nombre, precioBase, cantidad) {
        this.nombre = nombre            // Atributo
        this.#precioBase = precioBase        
        this.cantidad = cantidad
        this.descuentos = [] // Una lista de descuentos que se pueden aplicar al producto
    }

    // METODOS

    agregarDescuento(nuevoDescuento) {
        this.descuentos.push(nuevoDescuento)    // el push seria como un add (agregar un elemento a la lista)
    }

    precioFinal() {
        const precioBaseTotal = this.#precioBase * this.cantidad
        //console.log("Precio base total:", precioBaseTotal)  // un poco de debugging
        const precioFinal = this.descuentos.reduce(
            (precioAnterior, descuento) => {    // estan las llaves, pongo return
                return precioAnterior - descuento.valorDescontado(precioBaseTotal, this.cantidad)  // Funcion, descuento usa POLIMORFISMO en .valorDescontado
            }, precioBaseTotal                                                                     // Semilla
        ) // el fold es un reduce

        return Math.max(0,precioFinal) // que me retorna el precio Final (pero guarda con que me pase de descuentos, tengo que tener en cuenta la posibilidad de que sea gratis)
        // retorno 0 si me da negativo el precioFinal
    }

    // Getter y Setter para precioBase

    get precioBase() { // Para acceder al #precioBase necesito de un getter porque es un atributo privado
        return this.#precioBase
    }    

    set precioBase(nuevoPrecio) {   // Para setear un nuevo precio al #precioBase
        this.#precioBase = nuevoPrecio
    }

}

// Evolutivo  - Carrito de compras

// Desarrollo de la entidad “ItemCarrito”. Surge la necesidad de separar la entidad "Producto" de los elementos 
// agregados al carrito de compras. La nueva entidad ItemCarrito es la que debe conocer la cantidad agregada de un producto 
// y los descuentos aplicados.

// El Carrito es la nueva entidad que debe conocer a los ItemCarrito y se debe poder conocer el precio total del mismo.

class itemCarrito {
    constructor(producto, cantidad) {
        this.producto = producto
        this.cantidad = cantidad
        this.descuentos = [] // Una lista de descuentos que se pueden aplicar al producto
    }
    
    agregarDescuento(nuevoDescuento) {
        this.descuentos.push(nuevoDescuento)    // el push seria como un add (agregar un elemento a la lista)
    }

    precioFinal() {
        const precioBaseTotal = this.producto.precioBase * this.cantidad
        //console.log("Precio base total:", precioBaseTotal)  // un poco de debugging
        const precioFinal = this.descuentos.reduce(
            (precioAnterior, descuento) => {    // estan las llaves, pongo return
                return precioAnterior - descuento.valorDescontado(precioBaseTotal, this.cantidad)  // Funcion, descuento usa POLIMORFISMO en .valorDescontado
            }, precioBaseTotal                                                                     // Semilla
        ) // el fold es un reduce

        return Math.max(0,precioFinal) // que me retorna el precio Final (pero guarda con que me pase de descuentos, tengo que tener en cuenta la posibilidad de que sea gratis)
        // retorno 0 si me da negativo el precioFinal
    }
}

class Carrito {
    constructor() {
        this.items = [] // el carrito tiene una lista de items
    }

    agregarItem(nuevoItem) {
        this.items.push(nuevoItem)
    }

    precioTotal() {
        return this.items.reduce((acumulador, item) => acumulador + item.precioFinal(), 0)
    }
}

// Los tipos de Descuento (debe ser polimorfico)
// Todos los descuentos deben entender el metodo valorDescontado

class DescuentoFijo {

    constructor(valor) {
        this.valor = valor 
    }

    // metodo que aplica el polimorfismo
    valorDescontado(precioBase, cantidad) {
        return this.valor   // Porque el valor descontado en este caso es el valor mismo del descuento 
    }

}

class DescuentoPorcentual {

    constructor(porcentaje) {
        this.porcentaje = porcentaje
    }

    // metodo que aplica el polimorfismo
    valorDescontado(precioBase, cantidad) {
        return precioBase * this.porcentaje / 100 
    }
}

class DescuentoPorCantidad {
// "Tanto descuento en la N unidad" --> 100 % en la segunda unidad es 2 x 1

    constructor(cantidadMinima, porcentaje) {
        this.cantidadMinima = cantidadMinima
        this.porcentaje = porcentaje
    }

    valorDescontado(precioBase, cantidad) {
        const vecesRepetido = Math.floor(cantidad / this.cantidadMinima) // floor para redondear para abajo
        let valorDescontado = 0
        if(vecesRepetido >= 1) {
            valorDescontado = precioBase * (this.porcentaje / 100) * vecesRepetido
        }
        return valorDescontado
    }
}


// Para exportar en otros archivos, junto a lo que quiero exportar
module.exports = {Producto, DescuentoFijo, DescuentoPorCantidad, DescuentoPorcentual}


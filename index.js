// Para importar de otro archivo, tengo que referenciar a dicho archivo que estoy importando algo
const {Producto, DescuentoFijo, DescuentoPorCantidad, DescuentoPorcentual} = require('./domain.js')

// Instanciamos objetos
const p1 = new Producto("CocaCola", 10, 1)
//console.log(p1.precioBase) // 10
//p1.precioBase = 5   // De esta forma (como ya tengo el setter programado) puedo directamente reasignar un nuevo valor
//console.log(p1.precioBase) // 5

const galletitas = new Producto("Galletitas", 20, 2)

const leche = new Producto("Leche", 30, 2)

const fideos = new Producto("Fideos", 100, 2)
fideos.agregarDescuento(new DescuentoPorcentual(10))

// Instanciando Descuentos a CocaCola
const descuentoFijo = new DescuentoFijo(5)
p1.agregarDescuento(descuentoFijo)

//console.log(p1) // producto
//console.log("El precio final del producto es:" , p1.precioFinal())   // 5

// 3) Agregado de productos al carrito de compras. Por ahora el carrito será una lista de productos
const carrito = [p1]        // lista de productos 
carrito.push(galletitas)    // agrego al carrito las galles
carrito.push(fideos)        // agrego al carrito los fideos

const carrote = [galletitas, p1, fideos]

// Para hacer una funcion de agregar al carrito!!
function agregarProductoAlCarrito(nuevoProduto) {
    carrito.push(nuevoProduto)
    console.log(carrito)
}

// ---------------- FUNCIONES -------------------

// 4) Se deben desarrollar las siguientes funciones dada una lista de productos:
// a.Aumentar su precio base en determinado monto.

function aumentarPrecioConForEach(productos, monto) {
    productos.forEach(producto => {producto.precioBase = producto.precioBase + monto})  // el forEach aplica algo(una funcion) para cada elemento de la lista (CON EFECTO)
}

//Vemos el efecto....
//aumentarPrecioConForEach(carrito, 10)
//console.log("CocaCola:", p1.precioBase) // 20
//console.log("Galletitas:", galletitas.precioBase) // 30

function aumentarPrecioConMap(productos, monto) {
    return productos.map(producto => {producto.precioBase = producto.precioBase + monto})  // el map aplica algo(una funcion) para cada elemento de la lista (SIN EFECTO, crea una lista nueva)
}

// b.Obtener el precio final más alto de una lista de productos. Bonus: obtener el producto más caro.

function precioMasAlto(productos) {
    const preciosProductos = productos.map(producto => producto.precioBase)    // Lista de precios de los productos
    return Math.max(...preciosProductos) // ... para desconstruir esa lista en una secuencia de variables // max(10,20,30,...)
}

//console.log("Lista de precios del carrito:", carrito.map(producto => producto.precioBase))
//console.log("El precio mas alto es:", precioMasAlto(carrito))

// Bonus: obtener el producto más caro (CONSEJO: usar reduce)

// TIENE UN ERROR
//function productoMasCaro(productos) {
//    return productos.reduce((acumulador, numero) => Math.max(acumulador.precioBase, numero.precioBase), productos[0])
//}

function productoMasCaro(productos) {
    return productos.reduce((acumulador, numero) => productoMasCaroEntreDos(acumulador, numero), productos[0])
}

//console.log("El producto mas caro es:", productoMasCaro(carrito))

// El acumulador seria el que va resultando ser el numero mas grande entre las diferentes comparaciones que se van realizando
// productos[0] --> es el valor inicial del acumulador, que en este caso es el primer elemento de la lista

// Funcion auxiliar para un codigo mas modular y reutilizable
function productoMasCaroEntreDos(producto1, producto2) {
    if(producto1.precioBase > producto2.precioBase)
        return producto1
    else
        return producto2
}

// c.Obtener los productos con un precio final menor a determinado monto.

function productosMasBaratosQue(productos, monto) {
    return productos.filter(producto => producto.precioFinal() < monto)
}

//console.log(p1.precioFinal())
//console.log(galletitas.precioFinal())
//console.log(fideos.precioFinal())
//console.log(productosMasBaratosQue(carrito, 15))

// d.Obtener la suma total de los precios.

function obtenerPrecioTotal(productos) {    // reduce es como un fold
    return productos.reduce((acumulador, productoSiguiente) => {
        return acumulador + productoSiguiente.precioFinal()
    }, 0)
}

//console.log("El precio total del carrito es:" , obtenerPrecioTotal(carrito))

// e.Ordenar la lista por precio, de menor a mayor.

// OJO porque hay un map que NO TIENE EFECTO y luego un sort QUE SI
//function ordenarLista(productos) {
//    const preciosProductos = productos.map(producto => producto.precioBase)    // Lista de precios de los productos
//    preciosProductos.sort((a,b) => a - b)                                      // el sort se usa para ordenar los elementos de un lista 
//}

function ordenarListaV2(productos) {
    productos.sort((p1,p2) => p1.precioFinal() - p2.precioFinal())
}


// carrote = [galletitas $20, p1 $10, fideos $100]
ordenarListaV2(carrote) // ORDENO LA LISTA (TIENE EFECTO EN LA LISTA)
console.log("Lista:", carrote.map(producto => producto.precioBase))  
console.log("Lista ordenada de menor a mayor:", carrote)     

// Ejemplo de creacion de objeto literal
const objetoLiteral = {
    nombre: "Coquita",
    precioBase: 10,
    precioFinal: function() {
        return precioBase + 10
    }
}
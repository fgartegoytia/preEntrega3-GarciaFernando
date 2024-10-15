const guardarProductosLS= (productos) => {
    localStorage.setItem ("productos", JSON.stringify(productos));

};

const cargarProductosLS = ()=> {
    return JSON.parse(localStorage.getItem("productos")) || [];

}

const guardarIdProducto = (id)=>{
    localStorage.setItem("idProducto", JSON.stringify(id));
}

const cargarIdProducto=()=>{
    return JSON.parse(localStorage.getItem("idProducto"));

}

//Carrito --------------
const guardarCarritoLS=(productos)=>{
    localStorage.setItem("carrito",JSON.stringify(productos));

}
const cargarCarritoLS=() =>{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

//mje producto cargado -----------
const mostrarMensaje =(texto)=>{

    Swal.fire({
        position: "top-center",
        icon: "success",
        title: texto,
        showConfirmButton: false,
        timer: 1500
    });

}
//Bton agregar producto en carrito ------

const agregarProducto= (id) => {
    const productos=cargarProductosLS();
    const carrito=cargarCarritoLS();
    const producto=productos.find(item=> item.id== id);
    carrito.push(producto);
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    mostrarMensaje("Producto se agregó al carrito");
}

//carrito
const cantTotalProductosCarrito= ()=>{
    const carrito=cargarCarritoLS();
    return carrito.length;

}

const sumaTotalProductosCarrito=()=> {
    const carrito=cargarCarritoLS();
    return carrito.reduce((acum, item)=> acum+= item.precio,0);

}

const renderBotonCarrito=() =>{
    let contenidoHTML=  ` <button type="button" class="btn btn-danger position-relative">
    <i class="bi bi-cart"></i>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      ${cantTotalProductosCarrito()}
      
    </span>
  </button>`;
  document.getElementById("botonCarrito").innerHTML=contenidoHTML;

}

const limpiarCarrito = () =>{
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
}

const renderProductos = () => {
    const productos = cargarProductosLS();
    let contenidoHTML="";

    for (const item of productos) {
        contenidoHTML += ` <div class="col-md-3">
                <div class="card border-0 mb-2 h-100 text center">
                    <a href="producto.html" class="text-decoration-none text-dark" onclick="guardarIdProducto(${item.id})">
                        <img src="${item.imagen}" class="img-fluid" alt="${item.nombre}">
                        <div class="card-body">
                            <p class="card-text">${item.nombre}<br><b>$${item.precio}</b></p>
                        </div>
                    </a>
                </div>
            </div>`;
    }
    document.getElementById("contenido").innerHTML=contenidoHTML;
}
const renderProducto= ()=>{
    const idProducto= cargarIdProducto();
    const productos=cargarProductosLS();
    const producto= productos.find(item=> item.id== idProducto);

// Producto

let contenidoHTML= ` <div class="col-md-4  offset-md-2">
    <img src="${producto.imagen}" class="img-fluid h100" alt="${producto.nombre}"/>
</div>

<div class="col-md-4">
    <h1>${producto.nombre}<h1>
    <p>${producto.descripcion}</p>
    <p>$${producto.precio}</p>
    <p><button class="btn btn-danger" onclick="agregarProducto (${producto.id});">Agregar (+) </button></p>
   
</div>`;

    document.getElementById("contenido").innerHTML=contenidoHTML;
}

const renderCarrito= ()=>{
    const carrito=cargarCarritoLS();
    let contenidoHTML;


    if (carrito.length >0){
            contenidoHTML=`<table class="table">
        <tr>
        <td colspan="3"> <button class="btn btn-danger" onclick="limpiarCarrito();" >Limpiar Carrito</button></td>        
        </tr>`;  

        for (const item of carrito) {
            contenidoHTML += `<tr>
                <td class="align-middle"><img src="${item.imagen}" class="img-fluid" alt="${item.nombre}" width="80"></td>
                <td class="align-middle">${item.nombre}</td>
                <td class="align-middle">$${item.precio}</td>
                <td class="align-middle text-end"><i class="bi bi-trash"></i></td>         
                </tr>`;
        }

        contenidoHTML += `<tr>
        <td colspan="2"><b>Total a Pagar</b></td> 
        <td><b>$${sumaTotalProductosCarrito()}</b></td>        
        </tr>
        
        </table>`;
    } else{
        contenidoHTML= `<div class="alert alert-danger" role="alert">
        Carrito Vacío
      </div>`;

    }

    
   
    document.getElementById("contenido").innerHTML=contenidoHTML;


}
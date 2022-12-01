let btnAgregar = document.querySelector("#btnAgregar");
let btnBuscar = document.querySelector("#btnBuscar");
let btnRegresar = document.querySelector("#btnRegresar");

let ciudades = [];
load();

btnAgregar.addEventListener("click", async () => {
    console.log("Función Agregar");
    let codigo = document.querySelector('#codigo').value;
    let nombre = document.querySelector('#nombre').value;
    let renglon = {
        "idCiudad" : codigo,
        "nombre" : nombre
    };
    console.log(renglon);
    if (await aServidor(renglon,'A')) {
        load();
    }
    document.querySelector('#codigo').value="";
    document.querySelector('#nombre').value="";
});
btnBuscar.addEventListener("click", () => {
    console.log("Función Buscar");
    let codigo = document.querySelector('#codigo').value;
    if (codigo) 
        load(codigo);
    else
        load();
    document.querySelector('#codigo').value="";
})
btnRegresar.addEventListener("click", () => {
    window.location='./index.html';
});

function mostrarCiudades() {
    let html = "";
    for (let r of ciudades) {
        html += `
            <tr>
            <td><a href="./ciudad.html?idCiudad=${r.idCiudad}">${r.idCiudad}</a></td>
            <td><input class="vacio" type="text" name="" value="${r.nombre}" id="nom${r.idCiudad}"></td>
            <td><button class="btnDelCiudad" codigo="${r.idCiudad}">Borrar</button>
                <button class="btnUpdCiudad" codigo="${r.idCiudad}">Actualizar</button>
            </td>
            </tr>
        `; 
    }
    document.querySelector("#tblCiudades").innerHTML = html;
    let btnBorrar = document.querySelectorAll('.btnDelCiudad');
    btnBorrar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        let renglon = {
            "idCiudad" : codigo,
            "nombre" : document.querySelector(`#nom${codigo}`).value
        };
        if (await aServidor(renglon,'D')) {
            load();
        }    
    })})
    let btnModificar = document.querySelectorAll('.btnUpdCiudad');
    btnModificar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        let renglon = {
            "idCiudad" : codigo,
            "nombre" : document.querySelector(`#nom${codigo}`).value
        };
        if (await aServidor(renglon,'U')) {
            load();
        }    
    })})
}

async function load(codigo) {
    ciudades = [];
    let url = "";
    if (codigo) 
        url = `/ciudad/${codigo}`;
    else
        url = '/ciudad';            
    let respuesta = await fetch(url);
    if (respuesta.ok) {
        ciudades = await respuesta.json();
    }
    mostrarCiudades()
}

async function aServidor(datos, accion) {
    let respuesta;
    switch (accion) {
        case 'A': {     //ALTA
            respuesta = await fetch('/ciudad', {
                method :'POST',
                headers: { 'Content-Type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        } 
        case 'D' : {    //ELIMINACION
            respuesta = await fetch(`/ciudad/${datos.idCiudad}`, {
                method : 'DELETE'
            });   
            break;         
        }
        case 'U': {     //ACTUALIZACION
            respuesta = await fetch(`/ciudad`, {
                method : 'PUT',
                headers : { 'Content-type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        }
    }
    return ((await respuesta.text()) == "ok");
}
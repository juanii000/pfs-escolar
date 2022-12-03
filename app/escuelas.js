let btnAgregar = document.querySelector("#btnAgregar");
let btnBuscar = document.querySelector("#btnBuscar");
let btnRegresar = document.querySelector("#btnRegresar");

let escuelas = [];
load();

btnAgregar.addEventListener("click", async () => {
    console.log("Función Agregar");
    let codigo = document.querySelector('#codigo').value;
    let nombre = document.querySelector('#nombre').value;
    let domici = document.querySelector('#domicilio').value;
    let ciudad = document.querySelector('#ciudad').value;
    let renglon = {
        "idEscuela" : codigo,
        "nombre" : nombre,
        "domicilio" : domicilio,
        "idCiudad" : ciudad
    };
    console.log(renglon);
    if (await aServidor(renglon,'A')) {
        load();
    }
    document.querySelector('#codigo').value="";
    document.querySelector('#nombre').value="";
    document.querySelector('#domicilio').value="";
    document.querySelector('#ciudad').value="";
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

function mostrarEscuelas() {
    let html = "";
    for (let r of escuelas) {
        html += `
            <tr>
            <td><a href="./escuela.html?idEscuela=${r.idEscuela}">${r.idEscuela}</a></td>
            <td><input class="vacio" type="text" name="" value="${r.nombre}" id="nom${r.idEscuela}"></td>
            <td><input class="vacio" type="text" name="" value="${r.domicilio}" id="dom${r.idEscuela}"></td>
            <td><input class="vacio" type="text" name="" value="${r.idCiudad}" id="ciu${r.idEscuela}"></td>
            <td><button class="btnDelEscuela" codigo="${r.idEscuela}">Borrar</button>
                <button class="btnUpdEscuela" codigo="${r.idEscuela}">Actualizar</button>
            </td>
            </tr>
        `; 
    }
    document.querySelector("#tblEscuelas").innerHTML = html;
    let btnBorrar = document.querySelectorAll('.btnDelEscuela');
    btnBorrar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        let renglon = {
            "idEscuela" : codigo,
            "nombre" : document.querySelector(`#nom${codigo}`).value,
            "domicilio" : document.querySelector(`#dom${codigo}`).value,
            "idCiudad" : document.querySelector(`#ciu${codigo}`).value
        };
        if (await aServidor(renglon,'D')) {
            load();
        }    
    })})
    let btnModificar = document.querySelectorAll('.btnUpdEscuela');
    btnModificar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        let renglon = {
            "idEscuela" : codigo,
            "nombre" : document.querySelector(`#nom${codigo}`).value,
            "domicilio" : document.querySelector(`#dom${codigo}`).value,
            "idCiudad" : document.querySelector(`#ciu${codigo}`).value
        };
        if (await aServidor(renglon,'U')) {
            load();
        }    
    })})
}

async function load(codigo) {
    escuelas = [];
    let url = "";
    if (codigo) 
        url = `/escuela/${codigo}`;
    else
        url = '/escuela';            
    let respuesta = await fetch(url);
    if (respuesta.ok) {
        escuelas = await respuesta.json();
    }
    mostrarEscuelas()
}

async function aServidor(datos, accion) {
    let respuesta;
    switch (accion) {
        case 'A': {     //ALTA
            respuesta = await fetch('/escuela', {
                method :'POST',
                headers: { 'Content-Type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        } 
        case 'D' : {    //ELIMINACION
            respuesta = await fetch(`/escuela/${datos.idEscuela}`, {
                method : 'DELETE'
            });   
            break;         
        }
        case 'U': {     //ACTUALIZACION
            respuesta = await fetch(`/escuela`, {
                method : 'PUT',
                headers : { 'Content-type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        }
    }
    return ((await respuesta.text()) == "ok");
}
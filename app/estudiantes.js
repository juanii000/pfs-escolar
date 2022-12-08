let btnAgregar = document.querySelector("#btnAgregar");
let btnBuscar = document.querySelector("#btnBuscar");
let btnRegresar = document.querySelector("#btnRegresar");

let estudiantes = [];
load();

btnAgregar.addEventListener("click", async () => {
    console.log("Función Agregar");
    let codigo = document.querySelector('#codigo').value;
    let apellidoNombres = document.querySelector('#apellidoNombres').value;
    let fechaNacimiento = document.querySelector('#fechaNacimiento').value;
    let renglon = {
        "idEstudiante" : codigo,
        "apellidoNombres" : apellidoNombres,
        "fechaNacimiento" : fechaNacimiento
    };
    console.log(renglon);
    if (await aServidor(renglon,'A')) {
        load();
    }
    document.querySelector('#codigo').value="";
    document.querySelector('#apellidoNombres').value="";
    document.querySelector('#fechaNacimiento').value="";
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

function mostrarEstudiantes() {
    let html = "";
    for (let r of estudiantes) {
        html += `
            <tr>
            <td><a href="./estudiante.html?idEstudiante=${r.idEstudiante}">${r.idEstudiante}</a></td>
            <td><input class="vacio texto" type="text" name="" value="${r.apellidoNombres}" id="nom${r.idEstudiante}"></td>
            <td><input class="vacio fecha" type="date" name="" value="${r.fechaNacimiento.substr(0,10)}" id="fna${r.idEstudiante}"></td>
            <td><button class="btnDelEstudiante" codigo="${r.idEstudiante}">Borrar</button>
                <button class="btnUpdEstudiante" codigo="${r.idEstudiante}">Actualizar</button>
            </td>
            </tr>
        `; 
    }
    document.querySelector("#tblEstudiantes").innerHTML = html;
    let btnBorrar = document.querySelectorAll('.btnDelEstudiante');
    btnBorrar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        let renglon = {
            "idEstudiante" : codigo,
            "apellidoNombres" : document.querySelector(`#nom${codigo}`).value,
            "fechaNacimiento" : document.querySelector(`#fna${codigo}`).value
        };
        if (await aServidor(renglon,'D')) {
            load();
        }    
    })})
    let btnModificar = document.querySelectorAll('.btnUpdEstudiante');
    btnModificar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        let renglon = {
            "idEstudiante" : codigo,
            "apellidoNombres" : document.querySelector(`#nom${codigo}`).value,
            "fechaNacimiento" : document.querySelector(`#fna${codigo}`).value
        };
        if (await aServidor(renglon,'U')) {
            load();
        }    
    })})
}

async function load(codigo) {
    estudiantes = [];
    let url = "";
    if (codigo) 
        url = `/estudiante/${codigo}`;
    else
        url = '/estudiante';            
    let respuesta = await fetch(url);
    if (respuesta.ok) {
        estudiantes = await respuesta.json();
    }
    mostrarEstudiantes()
}

async function aServidor(datos, accion) {
    let respuesta;
    switch (accion) {
        case 'A': {     //ALTA
            respuesta = await fetch('/estudiante', {
                method :'POST',
                headers: { 'Content-Type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        } 
        case 'D' : {    //ELIMINACION
            respuesta = await fetch(`/estudiante/${datos.idEstudiante}`, {
                method : 'DELETE'
            });   
            break;         
        }
        case 'U': {     //ACTUALIZACION
            respuesta = await fetch(`/estudiante`, {
                method : 'PUT',
                headers : { 'Content-type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        }
    }
    return ((await respuesta.text()) == "ok");
}
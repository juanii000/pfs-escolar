let btnAgregar = document.querySelector("#btnAgregar");
let btnBuscar = document.querySelector("#btnBuscar");
let btnRegresar = document.querySelector("#btnRegresar");

let profesores = [];
load();

btnAgregar.addEventListener("click", async () => {
    console.log("Función Agregar");
    let codigo = document.querySelector('#codigo').value;
    let apellidoNombres = document.querySelector('#apellidoNombres').value;
    let renglon = {
        "idProfesor" : codigo,
        "apellidoNombres" : apellidoNombres
    };
    console.log(renglon);
    if (await aServidor(renglon,'A')) {
        load();
    }
    document.querySelector('#codigo').value="";
    document.querySelector('#apellidoNombres').value="";
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

function mostrarProfesores() {
    let html = "";
    for (let r of profesores) {
        html += `
            <tr>
            <td><a href="./profesor.html?idProfesor=${r.idProfesor}">${r.idProfesor}</a></td>
            <td><input class="vacio" type="text" name="" value="${r.apellidoNombres}" id="nom${r.idProfesor}"></td>
            <td><button class="btnDelProfesor" codigo="${r.idProfesor}">Borrar</button>
                <button class="btnUpdProfesor" codigo="${r.idProfesor}">Actualizar</button>
            </td>
            </tr>
        `; 
    }
    document.querySelector("#tblProfesores").innerHTML = html;
    let btnBorrar = document.querySelectorAll('.btnDelProfesor');
    btnBorrar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        let renglon = {
            "idProfesor" : codigo,
            "apellidoNombres" : document.querySelector(`#nom${codigo}`).value
        };
        if (await aServidor(renglon,'D')) {
            load();
        }    
    })})
    let btnModificar = document.querySelectorAll('.btnUpdProfesor');
    btnModificar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        let renglon = {
            "idProfesor" : codigo,
            "apellidoNombres" : document.querySelector(`#nom${codigo}`).value
        };
        if (await aServidor(renglon,'U')) {
            load();
        }    
    })})
}

async function load(codigo) {
    profesores = [];
    let url = "";
    if (codigo) 
        url = `/profesor/${codigo}`;
    else
        url = '/profesor';            
    let respuesta = await fetch(url);
    if (respuesta.ok) {
        profesores = await respuesta.json();
    }
    mostrarProfesores()
}

async function aServidor(datos, accion) {
    let respuesta;
    switch (accion) {
        case 'A': {     //ALTA
            respuesta = await fetch('/profesor', {
                method :'POST',
                headers: { 'Content-Type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        } 
        case 'D' : {    //ELIMINACION
            respuesta = await fetch(`/profesor/${datos.idProfesor}`, {
                method : 'DELETE'
            });   
            break;         
        }
        case 'U': {     //ACTUALIZACION
            respuesta = await fetch(`/profesor`, {
                method : 'PUT',
                headers : { 'Content-type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        }
    }
    return ((await respuesta.text()) == "ok");
}
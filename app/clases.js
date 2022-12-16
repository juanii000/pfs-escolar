import { armarReferencia, aServidor } from "./funciones.js";

let btnAgregar = document.querySelector("#btnAgregar");
let btnBuscar = document.querySelector("#btnBuscar");
let btnRegresar = document.querySelector("#btnRegresar");
let btnAgrEstudiantes = document.querySelector("#btnAgrEstudiantes");

armarReferencia('#selEscuela', 'escuela', 'idEscuela', 'idEscuela', 'nombre', 0);
armarReferencia('#selProfesor', 'profesor', 'idProfesor', 'idProfesor', 'apellidoNombres', 0);

let clases = [];
load();

btnAgregar.addEventListener("click", async () => {
    console.log("Función Agregar");
    let estudiantes = [];
    let estudiante, idEstudiante;
    let nombre = document.querySelector('#nombre').value;
    let escuela = document.querySelector('#idEscuela').value;
    let profesor = document.querySelector('#idProfesor').value;
    if (document.querySelector('#tblEstudiantesClase').hasChildNodes) {
        if (document.querySelector('#tblEstudiantes').hasChildNodes) {
            let datosEstudiantes = document.querySelector("#tblEstudiantes").childNodes;
            for (let i=1; i<datosEstudiantes.length; i++) {
                estudiante = datosEstudiantes[i].firstChild.innerHTML;
                idEstudiante = estudiante.substring(0,estudiante.indexOf(' - '));
                estudiantes.push( { "idEstudiante" : idEstudiante,
                                    "apellidoNombres" : "",
                                    "fechaNacimiento" : "" } );
            }
        }
    }
    let renglon = {
        "nombre" : nombre,
        "escuela" : { "idEscuela" : escuela, "nombre" : "", "domicilio" : "", "ciudadIdCiudad" : "" },
        "profesor" : { "idProfesor" : profesor, "apellidoNombres" : "" },
        "estudiantes" : estudiantes
    };
    console.log(renglon);
    if (await aServidor('clase', null, renglon, 'A')) {
        load();
    }
    document.querySelector('#nombre').value="";
    document.querySelector('#idEscuela').value="";
    document.querySelector('#idProfesor').value="";
    document.querySelector('#tblEstudiantesClase').innerHTML="";
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
btnAgrEstudiantes.addEventListener("click", async () => {
    let tabla = document.createElement("table");
    tabla.id = "tblEstudiantes";
    let fila = document.createElement("thead");
    let celda = document.createElement("td");   
    celda.innerHTML = `${await armarReferencia(null, 'estudiante', `selEstudiante`, 'idEstudiante', 'apellidoNombres', 0)}`;
    fila.appendChild(celda);
    tabla.appendChild(fila);
    document.querySelector("#tblEstudiantesClase").appendChild(tabla);
    document.querySelector(`#selEstudiante`).addEventListener("change", async () => {
        let tabla = document.querySelector("#tblEstudiantes");
        let fila = document.createElement("tr");
        let celda = document.createElement("td");
        let seleccion = document.querySelector('#selEstudiante');
        celda.innerHTML = `${seleccion.value} - ${seleccion.selectedOptions[0].innerHTML}`;
        fila.appendChild(celda);
        tabla.appendChild(fila);
        seleccion.value=0;    
    });    
});

async function mostrarClases() {
    let html = "";
    for (let r of clases) {
        html += `
            <tr>
            <td><a href="./clase.html?idClase=${r.idClase}">${r.idClase}</a></td>
            <td><input class="vacio texto" type="text" name="" value="${r.nombre}" id="nom${r.idClase}"></td>
            <td>${await armarReferencia(null, 'escuela', 'esc'+r.idClase, 'idEscuela', 'nombre', r.escuela.idEscuela)}</td>
            <td>${await armarReferencia(null, 'profesor', 'pro'+r.idClase, 'idProfesor', 'apellidoNombres', r.profesor.idProfesor)}</td>
            <td><button class="btnDelEscuela" codigo="${r.idClase}">Borrar</button>
                <button class="btnUpdEscuela" codigo="${r.idClase}">Actualizar</button>
            </td>
            </tr>
        `; 
}
    document.querySelector("#tblClases").innerHTML = html;
    let btnBorrar = document.querySelectorAll('.btnDelEscuela');
    btnBorrar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        if (await aServidor('clase', codigo, null, 'D')) {
            load();
        }    
    })})
    let btnModificar = document.querySelectorAll('.btnUpdEscuela');
    btnModificar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        let renglon = {
            "nombre" : document.querySelector(`#nom${codigo}`).value,
            "escuela" : { "idEscuela" : escuela, "nombre" : "", "domicilio" : "", "ciudadIdCiudad" : "" },
            "profesor" : { "idProfesor" : profesor, "apellidoNombres" : "" }
        };
        if (await aServidor('clase', codigo, renglon, 'U')) {
            load();
        }    
    })})
}

async function load(codigo) {
    clases = [];
    let url = "";
    if (codigo) 
        url = `/clase/${codigo}`;
    else
        url = '/clase';            
    let respuesta = await fetch(url);
    if (respuesta.ok) {
        clases = await respuesta.json();
    }
    mostrarClases()
}
import { armarReferencia, aServidor } from "./funciones.js";

let btnAgregar = document.querySelector("#btnAgregar");
let btnBuscar = document.querySelector("#btnBuscar");
let btnRegresar = document.querySelector("#btnRegresar");

armarReferencia("#selCiudad","ciudad", 'idCiudad', 'idCiudad', 'nombre', 0);

let escuelas = [];
load();

btnAgregar.addEventListener("click", async () => {
    console.log("Función Agregar");
    let codigo = document.querySelector('#codigo').value;
    let nombre = document.querySelector('#nombre').value;
    let domicilio = document.querySelector('#domicilio').value;
    let ciudad = document.querySelector('#idCiudad').value;
    let renglon = {
        "idEscuela" : codigo,
        "nombre" : nombre,
        "domicilio" : domicilio,
        "idCiudad" : ciudad
    };
    console.log(renglon);
    if (await aServidor('escuela', codigo, renglon, 'A')) {
        load();
    }
    document.querySelector('#codigo').value="";
    document.querySelector('#nombre').value="";
    document.querySelector('#domicilio').value="";
    document.querySelector('#idCiudad').value="";
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

async function mostrarEscuelas() {
    let html = "";
    for (let r of escuelas) {
        html += `
            <tr>
            <td><a href="./escuela.html?idEscuela=${r.idEscuela}">${r.idEscuela}</a></td>
            <td><input class="vacio texto" type="text" name="" value="${r.nombre}" id="nom${r.idEscuela}"></td>
            <td><input class="vacio texto" type="text" name="" value="${r.domicilio}" id="dom${r.idEscuela}"></td>
            <td>${await armarReferencia(null, 'ciudad', 'ciu'+r.idEscuela, 'idCiudad', 'nombre', r.ciudad.idCiudad)}</td>
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
        if (await aServidor('escuela', codigo, null, 'D')) {
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
            "ciudad" : { "idCiudad": document.querySelector(`#ciu${codigo}`).value, "nombre" : "" }
        };
        if (await aServidor('escuela', codigo, renglon, 'U')) {
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
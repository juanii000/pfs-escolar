import { armarReferencia, aServidor } from "./funciones.js";

let parametros = [];
function procesarParametros() {
    parametros = [];
    let parStr = window.location.search.substr(1);
    let parArr = parStr.split("&");
    for (let i = 0; i < parArr.length; i++) {
        let par = parArr[i].split("=");
        parametros[par[0]] = par[1];
    }
}

document.querySelector("#btnRegresar").addEventListener("click", () => {
    window.location='./clases.html';
});

load();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function load() {
    try {
        let clases = [];
        procesarParametros();
        // let url = `/clase/${parametros['idClase']}`;
        let url = `/clase/${parametros['idClase']}/estudiantes`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let clase = await respuesta.json();
            clase = clase[0];  //PORQUE SIEMPRE DEVUELVO UN ARRAY AUNQUE SEA UN SOLO REGISTRO
            document.querySelector('#codigo').value = clase.idClase;
            document.querySelector('#nombre').value = clase.nombre;
            armarReferencia("#selEscuela","escuela", 'idEscuela', 'idEscuela', 'nombre', clase.idEscuela);
            armarReferencia("#selProfesor","profesor", 'idProfesor', 'idProfesor', 'apellidoNombres', clase.idProfesor);
            if (clase.estudiantes) {
                let html = '';
                clase.estudiantes.forEach(e => {
                    html += `
    <tr>
        <td>${e.idEstudiante} - ${e.apellidoNombres}</td>
    </tr>
                `; 
                });
                document.querySelector('#tblEstudiantesClase').innerHTML = html;
            }
            document.querySelector('#acciones').innerHTML = `
            <button class="btnDelClase" idClase="${clase.idClase}">Borrar</button>
            <button class="btnUpdClase" idClase="${clase.idClase}">Actualizar</button>
            `;
            let btnBorrar = document.querySelector('.btnDelClase');
            btnBorrar.addEventListener('click', async () => {
                let idClase = this.getAttribute('idClase');
                if (await aServidor('clase', idClase, null, 'D')) {
                    document.querySelector('#acciones').innerHTML=`
                <a href="./clases.html">Regresar</a>
                    `;
                }    
            });
            let btnModificar = document.querySelector('.btnUpdClase');
            btnModificar.addEventListener('click', async () => {
                let idClase = btnModificar.attributes['idClase'].value;
                let renglon = {
                    "nombre" : document.querySelector('#nombre').value,
                    "idEscuela" : document.querySelector('#idEscuela').value,
                    "idProfesor" : document.querySelector('#idProfesor').value
                }        
                if (await aServidor('clase', idClase, renglon, 'U')) {
                    document.querySelector('#acciones').innerHTML="";
                }    
            });
        } else {
            document.querySelector("#pTitulo").innerHTML = `ERROR - Fallo URL`;
        }
    } catch (error) {
        document.querySelector("#pTitulo").innerHTML = `ERROR - Fallo en Conexion`;    
    }
}
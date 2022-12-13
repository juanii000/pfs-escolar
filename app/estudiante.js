import { aServidor } from "./funciones.js";

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
    window.location='./estudiantes.html';
});

load();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function load() {
    try {
        let estudiantes = [];
        procesarParametros();
        let url = `/estudiante/${parametros['idEstudiante']}`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let estudiante = await respuesta.json();
            estudiante = estudiante[0];  //PORQUE SIEMPRE DEVUELVO UN ARRAY AUNQUE SEA UN SOLO REGISTRO
            document.querySelector("#codigo").value = estudiante.idEstudiante;
            document.querySelector('#apellidoNombres').value = estudiante.apellidoNombres;
            document.querySelector('#fechaNacimiento').value = estudiante.fechaNacimiento.substr(0,10);
            if (estudiante.clases) {
                let html = '';
                estudiante.clases.forEach(e => {
                    html += `
    <tr>
        <td>${e.idClase} - ${e.nombre}</td>
    </tr>
                `; 
                });
                document.querySelector('#tblClases').innerHTML = html;
            }
            document.querySelector('#acciones').innerHTML = `
            <button class="btnDelEstudiante" idEstudiante="${estudiante.idEstudiante}">Borrar</button>
            <button class="btnUpdEstudiante" idEstudiante="${estudiante.idEstudiante}">Actualizar</button>
            `;
            let btnBorrar = document.querySelector('.btnDelEstudiante');
            btnBorrar.addEventListener('click', async () => {
                let idEstudiante = this.getAttribute('idEstudiante');
                if (await aServidor('estudiante', idEstudiante, null, 'D')) {
                    document.querySelector('#acciones').innerHTML=`
                <a href="./estudiantes.html">Regresar</a>
                    `;
                }    
            });
            let btnModificar = document.querySelector('.btnUpdEstudiante');
            btnModificar.addEventListener('click', async () => {
                let idEstudiante = btnModificar.attributes['idEstudiante'].value;
                let renglon = {
                    "idEstudiante" : idEstudiante,
                    "apellidoNombres" : document.querySelector('#apellidoNombres').value,
                    "fechaNacimiento" : document.querySelector('#fechaNacimiento').value
                }        
                if (await aServidor('estudiante', idEstudiante, renglon,'U')) {
                    document.querySelector('#acciones').innerHTML=`
                <a href="./estudiantes.html">Regresar</a>
                    `;
                }    
            });
        } else {
            document.querySelector("#pTitulo").innerHTML = `ERROR - Fallo URL`;
        }
    } catch (error) {
        document.querySelector("#pTitulo").innerHTML = `ERROR - Fallo en Conexion`;    
    }
}
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
    window.location='./profesores.html';
});

load();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function load() {
    try {
        let profesores = [];
        procesarParametros();
        let url = `/profesor/${parametros['idProfesor']}`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let profesor = await respuesta.json();
            profesor = profesor[0]; //PORQUE SIEMPRE DEVUELVO UN ARRAY AUNQUE SEA UN SOLO REGISTRO
            document.querySelector("#codigo").value = profesor.idProfesor;
            document.querySelector('#apellidoNombres').value = profesor.apellidoNombres;
            if (profesor.clases) {
                let html = '';
                profesor.clases.forEach(e => {
                    html += `
    <tr>
        <td>${e.idClase} - ${e.nombre}</td>
    </tr>
                `; 
                });
                document.querySelector('#tblClases').innerHTML = html;
            }
            document.querySelector('#acciones').innerHTML = `
            <button class="btnDelProfesor" idProfesor="${profesor.idProfesor}">Borrar</button>
            <button class="btnUpdProfesor" idProfesor="${profesor.idProfesor}">Actualizar</button>
            `;
            let btnBorrar = document.querySelector('.btnDelProfesor');
            btnBorrar.addEventListener('click', async () => {
                let idProfesor = this.getAttribute('idProfesor');
                if (await aServidor('profesor', idProfesor,  null, 'D')) {
                    document.querySelector('#acciones').innerHTML=`
                <a href="./profesores.html">Regresar</a>
                    `;
                }    
            });
            let btnModificar = document.querySelector('.btnUpdProfesor');
            btnModificar.addEventListener('click', async () => {
                let idProfesor = btnModificar.attributes['idProfesor'].value;
                let renglon = {
                    "idProfesor" : idProfesor,
                    "apellidoNombres" : document.querySelector('#apellidoNombres').value,
                }        
                if (await aServidor('profesor', idProfesor, renglon, 'U')) {
                    document.querySelector('#acciones').innerHTML=`
                <a href="./profesores.html">Regresar</a>
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
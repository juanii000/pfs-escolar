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
    window.location='./escuelas.html';
});

load();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function load() {
    try {
        let escuelas = [];
        procesarParametros();
        let url = `/escuela/${parametros['idEscuela']}`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let escuela = await respuesta.json();
            escuela = escuela[0]; //PORQUE SIEMPRE DEVUELVO UN ARRAY AUNQUE SEA UN SOLO REGISTRO
            document.querySelector("#codigo").value = escuela.idEscuela;
            document.querySelector('#nombre').value = escuela.nombre;
            document.querySelector('#domicilio').value = escuela.domicilio;
            armarReferencia("#selCiudad", "ciudad", 'idCiudad', 'idCiudad', 'nombre', escuela.ciudad.idCiudad);
            if (escuela.clases) {
                let html = '';
                escuela.clases.forEach(e => {
                    html += `
    <tr>
        <td>${e.idClase} - ${e.nombre}</td>
    </tr>
                `; 
                });
                document.querySelector('#tblClases').innerHTML = html;
            }
            document.querySelector('#acciones').innerHTML = `
            <button class="btnDelEscuela" idEscuela="${escuela.idEscuela}">Borrar</button>
            <button class="btnUpdEscuela" idEscuela="${escuela.idEscuela}">Actualizar</button>
            `;
            let btnBorrar = document.querySelector('.btnDelEscuela');
            btnBorrar.addEventListener('click', async () => {
                let idEscuela = this.getAttribute('idEscuela');
                if (await aServidor('escuela', idEscuela, null, 'D')) {
                    document.querySelector('#acciones').innerHTML=`
                <a href="./escuelas.html">Regresar</a>
                    `;
                }    
            });
            let btnModificar = document.querySelector('.btnUpdEscuela');
            btnModificar.addEventListener('click', async () => {
                let idEscuela = btnModificar.attributes['idEscuela'].value;
                let renglon = {
                    "idEscuela" : idEscuela,
                    "nombre" : document.querySelector('#nombre').value,
                    "domicilio" : document.querySelector('#domicilio').value,
                    "idCiudad" : document.querySelector('#idCiudad').value
                }        
                if (await aServidor('escuela', idEscuela, renglon, 'U')) {
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
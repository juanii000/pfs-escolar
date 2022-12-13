import { aServidor } from './funciones.js'

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
    window.location='./ciudades.html';
});

load();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function load() {
    try {
        let ciudades = [];
        procesarParametros();
        let url = `/ciudad/${parametros['idCiudad']}`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let ciudad = await respuesta.json();
            ciudad = ciudad[0]; //PORQUE SIEMPRE DEVUELVO UN ARRAY AUNQUE SEA UN SOLO REGISTRO
            document.querySelector("#codigo").value = ciudad.idCiudad;
            document.querySelector('#nombre').value = ciudad.nombre;
            if (ciudad.escuelas) {
                let html = '';
                ciudad.escuelas.forEach(e => {
                    html += `
    <tr>
        <td>${e.idEscuela} - ${e.nombre}</td>
    </tr>
                `; 
                });
                document.querySelector('#tblEscuelas').innerHTML = html;
            }
            document.querySelector('#acciones').innerHTML = `
            <button class="btnDelCiudad" idCiudad="${ciudad.idCiudad}">Borrar</button>
            <button class="btnUpdCiudad" idCiudad="${ciudad.idCiudad}">Actualizar</button>
            `;
            let btnBorrar = document.querySelector('.btnDelCiudad');
            btnBorrar.addEventListener('click', async () => {
                let idCiudad = this.getAttribute('idCiudad');
                if (await aServidor('ciudad', idCiudad, null, 'D')) {
                    document.querySelector('#acciones').innerHTML=`
                <a href="./ciudades.html">Regresar</a>
                    `;
                }    
            });
            let btnModificar = document.querySelector('.btnUpdCiudad');
            btnModificar.addEventListener('click', async () => {
                let idCiudad = btnModificar.attributes['idCiudad'].value;
                let renglon = {
                    "idCiudad" : idCiudad,
                    "nombre" : document.querySelector('#nombre').value,
                }        
                if (await aServidor('ciudad', idCiudad, renglon, 'U')) {
                    document.querySelector('#acciones').innerHTML=`
                <a href="./ciudades.html">Regresar</a>
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
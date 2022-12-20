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
    window.location=`./clase.html?idClase=${parametros['idClase']}`;
});
armarCalendario()

load();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function armarCalendario() {
    let dia = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    let mes = [31,28,31,30,31,30,31,31,30,31,30,31];
    let html = `
    <ol>`;
    for (let i = 0; i<7; i++) {
        html += `
        <li class="dia">${dia[i]}</li>
        `;
    }
    let id = 1;
    for (let i = 0; i<mes.length; i++) {
        for (let j=1; j<=mes[i]; j++) {
            let clase = ' class="';
            if ((i % 2)==0)
                clase += 'sombra';
            if (i==0 && j==1)
                clase += ' primero';
            clase += '"';
            html += `
        <li${clase} id="d${id}">${j}</li>
            `;
            id++;
        }
    }
    html += "</ol>";
    document.querySelector('#dContenido').innerHTML = html;
}
async function load() {
    try {
        procesarParametros();
        let url = `/asistencia/${parametros['idClase']}-${parametros['idEstudiante']}`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let asistencia = await respuesta.json();            
            if (asistencia) {
                let ahora = new Date();
                let inicio = new Date(ahora.getFullYear(),0,0);
                for (let i = 0; i < asistencia.length; i++) {
                    let fechaStr = asistencia[i].fecha;
                    let fecha = new Date(fechaStr.substr(0,4), parseInt(fechaStr.substr(5,2))-1, fechaStr.substr(8,2));
                    document.querySelector(`#d${getDoY(fecha, inicio)}`).classList.toggle('asiste');                    
                }
            }
            document.querySelector("#pTitulo").innerHTML = `Asistencia Clase ${parametros['idClase']} - Estudiante ${parametros['idEstudiante']}`;
        } else {
            document.querySelector("#pTitulo").innerHTML = `ERROR - Fallo URL`;
        }
    } catch (error) {
        document.querySelector("#pTitulo").innerHTML = `ERROR - Fallo en Conexion`;    
    }
}

function getDoY(fecha, ahora) {
    return Math.floor((fecha - ahora) / 1000 / 60 / 60 / 24);
}
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
        estudiantes = [];
        procesarParametros();
        let url = `/estudiante/${parametros['idEstudiante']}`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let estudiante = await respuesta.json();
            // document.querySelector('#idEstudiante').value = estudiante['idEstudiante'];
            document.querySelector("#pTitulo").innerHTML = `Estudiante - ${estudiante[0]['idEstudiante']}`;
            document.querySelector('#apellidoNombres').value = estudiante[0]['apellidoNombres'];
            document.querySelector('#fechaNacimiento').value = estudiante[0]['fechaNacimiento'].substr(0,10);
            document.querySelector('#acciones').innerHTML = `
            <button class="btnDelEstudiante" idEstudiante="${estudiante[0]['idEstudiante']}">Borrar</button>
            <button class="btnUpdEstudiante" idEstudiante="${estudiante[0]['idEstudiante']}">Actualizar</button>
            `;
            let btnBorrar = document.querySelector('.btnDelEstudiante');
            btnBorrar.addEventListener('click', async () => {
                let idEstudiante = this.getAttribute('idEstudiante');
                if (await aServidor(idEstudiante,'D')) {
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
                if (await aServidor(renglon,'U')) {
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

async function aServidor(datos, accion) {
    let respuesta;
    switch (accion) {
        case 'D' : {    //ELIMINACION
            respuesta = await fetch(`/estudiante/${datos}`, {
                method : 'DELETE'
            });   
            break;         
        }
        case 'U': {     //ACTUALIZACION
            respuesta = await fetch(`/estudiante/${datos.idEstudiante}`, {
                method : 'PUT',
                headers : { 'Content-type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        }
    }
    return ((await respuesta.text()) == "ok");
}
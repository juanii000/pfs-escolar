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
        profesores = [];
        procesarParametros();
        let url = `/profesor/${parametros['idProfesor']}`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let profesor = await respuesta.json();
            // document.querySelector('#idProfesor').value = profesor['idProfesor'];
            document.querySelector("#pTitulo").innerHTML = `Profesor - ${profesor[0]['idProfesor']}`;
            document.querySelector('#apellidoNombres').value = profesor[0]['apellidoNombres'];
            document.querySelector('#acciones').innerHTML = `
            <button class="btnDelProfesor" idProfesor="${profesor[0]['idProfesor']}">Borrar</button>
            <button class="btnUpdProfesor" idProfesor="${profesor[0]['idProfesor']}">Actualizar</button>
            `;
            let btnBorrar = document.querySelector('.btnDelProfesor');
            btnBorrar.addEventListener('click', async () => {
                let idProfesor = this.getAttribute('idProfesor');
                if (await aServidor(idProfesor,'D')) {
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
                if (await aServidor(renglon,'U')) {
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

async function aServidor(datos, accion) {
    let respuesta;
    switch (accion) {
        case 'D' : {    //ELIMINACION
            respuesta = await fetch(`/profesor/${datos}`, {
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
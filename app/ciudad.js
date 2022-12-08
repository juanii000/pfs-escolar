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
        ciudades = [];
        procesarParametros();
        let url = `/ciudad/${parametros['idCiudad']}`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let ciudad = await respuesta.json();
            // document.querySelector('#idCiudad').value = ciudad['idCiudad'];
            document.querySelector("#pTitulo").innerHTML = `Ciudad - ${ciudad[0]['idCiudad']}`;
            document.querySelector('#nombre').value = ciudad[0]['nombre'];
            document.querySelector('#acciones').innerHTML = `
            <button class="btnDelCiudad" idCiudad="${ciudad[0]['idCiudad']}">Borrar</button>
            <button class="btnUpdCiudad" idCiudad="${ciudad[0]['idCiudad']}">Actualizar</button>
            `;
            let btnBorrar = document.querySelector('.btnDelCiudad');
            btnBorrar.addEventListener('click', async () => {
                let idCiudad = this.getAttribute('idCiudad');
                if (await aServidor(idCiudad,'D')) {
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
                if (await aServidor(renglon,'U')) {
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

async function aServidor(datos, accion) {
    let respuesta;
    switch (accion) {
        case 'D' : {    //ELIMINACION
            respuesta = await fetch(`/ciudad/${datos}`, {
                method : 'DELETE'
            });   
            break;         
        }
        case 'U': {     //ACTUALIZACION
            respuesta = await fetch(`/ciudad`, {
                method : 'PUT',
                headers : { 'Content-type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        }
    }
    return ((await respuesta.text()) == "ok");
}
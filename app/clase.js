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
        clases = [];
        procesarParametros();
        let url = `/clase/${parametros['idClase']}`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let clase = await respuesta.json();
            document.querySelector("#pTitulo").innerHTML = `Clase - ${clase[0]['idClase']}`;
            document.querySelector('#nombre').value = clase[0]['nombre'];
            armarReferencia("#selEscuela","escuela", 'idEscuela', 'idEscuela', 'nombre', clase[0]['idEscuela']);
            armarReferencia("#selProfesor","profesor", 'idProfesor', 'idProfesor', 'apellidoNombres', clase[0]['idProfesor']);
            // document.querySelector('#escuela').value = clase[0]['idEscuela'];
            // document.querySelector('#profesor').value = clase[0]['idProfesor'];
            document.querySelector('#acciones').innerHTML = `
            <button class="btnDelClase" idClase="${clase[0]['idClase']}">Borrar</button>
            <button class="btnUpdClase" idClase="${clase[0]['idClase']}">Actualizar</button>
            `;
            let btnBorrar = document.querySelector('.btnDelClase');
            btnBorrar.addEventListener('click', async () => {
                let idClase = this.getAttribute('idClase');
                if (await aServidor(idClase, null,'D')) {
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
                if (await aServidor(idClase, renglon,'U')) {
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

async function aServidor(id, datos, accion) {
    let respuesta;
    switch (accion) {
        case 'D' : {    //ELIMINACION
            respuesta = await fetch(`/clase/${id}`, {
                method : 'DELETE'
            });   
            break;         
        }
        case 'U': {     //ACTUALIZACION
            respuesta = await fetch(`/clase/${id}`, {
                method : 'PUT',
                headers : { 'Content-type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        }
    }
    return ((await respuesta.text()) == "ok");
}

async function armarReferencia(campo, tabla, id, codi, desc, valor) {
    let url = `./${tabla}`;
    let datos = [];
    let opciones = "";
    let respuesta = await fetch(url);
    if (respuesta.ok) {
        datos = await respuesta.json();
    }
    let cabeSelect = `<select name="" id="${(id?id:"")}">`;
    opciones += `
  <option value="0"${(valor==0?" selected":"")}></option>`;
    for (let r of datos) {
        opciones += `
  <option value="${r[codi]}"${(valor==r[codi]?" selected":"")}>${r[desc]}</option>`;
    }
    let pieSelect = `
</select>`;
    if (campo)
        document.querySelector(campo).innerHTML = cabeSelect + opciones + pieSelect;
    else
        return cabeSelect + opciones + pieSelect;
}
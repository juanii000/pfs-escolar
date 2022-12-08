let btnAgregar = document.querySelector("#btnAgregar");
let btnBuscar = document.querySelector("#btnBuscar");
let btnRegresar = document.querySelector("#btnRegresar");

armarReferencia("#selEscuela","escuela", 'idEscuela', 'idEscuela', 'nombre', 0);
armarReferencia("#selProfesor","profesor", 'idProfesor', 'idProfesor', 'apellidoNombres', 0);

let clases = [];
load();

btnAgregar.addEventListener("click", async () => {
    console.log("Función Agregar");
    let nombre = document.querySelector('#nombre').value;
    let escuela = document.querySelector('#idEscuela').value;
    let profesor = document.querySelector('#idProfesor').value;
    let renglon = {
        "nombre" : nombre,
        "idEscuela" : escuela,
        "idProfesor" : profesor
    };
    console.log(renglon);
    if (await aServidor(null, renglon,'A')) {
        load();
    }
    document.querySelector('#nombre').value="";
    document.querySelector('#idEscuela').value="";
    document.querySelector('#idProfesor').value="";
});
btnBuscar.addEventListener("click", () => {
    console.log("Función Buscar");
    let codigo = document.querySelector('#codigo').value;
    if (codigo) 
        load(codigo);
    else
        load();
    document.querySelector('#codigo').value="";
})
btnRegresar.addEventListener("click", () => {
    window.location='./index.html';
});

async function mostrarClases() {
    let html = "";
    for (let r of clases) {
        html += `
            <tr>
            <td><a href="./clase.html?idClase=${r.idClase}">${r.idClase}</a></td>
            <td><input class="vacio texto" type="text" name="" value="${r.nombre}" id="nom${r.idClase}"></td>
            <td>${await armarReferencia(null, 'escuela', 'esc'+r.idClase, 'idEscuela', 'nombre', r.idEscuela)}</td>
            <td>${await armarReferencia(null, 'profesor', 'pro'+r.idClase, 'idProfesor', 'apellidoNombres', r.idProfesor)}</td>
            <td><button class="btnDelEscuela" codigo="${r.idClase}">Borrar</button>
                <button class="btnUpdEscuela" codigo="${r.idClase}">Actualizar</button>
            </td>
            </tr>
        `; 
        // <td><input class="vacio" type="text" name="" value="${r.idEscuela}" id="esc${r.idClase}"></td>
        // <td><input class="vacio" type="text" name="" value="${r.idProfesor}" id="pro${r.idClase}"></td>
}
    document.querySelector("#tblClases").innerHTML = html;
    let btnBorrar = document.querySelectorAll('.btnDelEscuela');
    btnBorrar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        if (await aServidor(codigo, null,'D')) {
            load();
        }    
    })})
    let btnModificar = document.querySelectorAll('.btnUpdEscuela');
    btnModificar.forEach(bd => { bd.addEventListener('click', async () => {
        let codigo = bd.getAttribute('codigo');
        let renglon = {
            "nombre" : document.querySelector(`#nom${codigo}`).value,
            "idEscuela" : document.querySelector(`#esc${codigo}`).value,
            "idProfesor" : document.querySelector(`#pro${codigo}`).value
        };
        if (await aServidor(codigo, renglon,'U')) {
            load();
        }    
    })})
}

async function load(codigo) {
    clases = [];
    let url = "";
    if (codigo) 
        url = `/clase/${codigo}`;
    else
        url = '/clase';            
    let respuesta = await fetch(url);
    if (respuesta.ok) {
        clases = await respuesta.json();
    }
    mostrarClases()
}

async function aServidor(id, datos, accion) {
    let respuesta;
    switch (accion) {
        case 'A': {     //ALTA
            respuesta = await fetch('/clase', {
                method :'POST',
                headers: { 'Content-Type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        } 
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
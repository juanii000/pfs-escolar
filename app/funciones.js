async function aServidor(api, id, datos, accion) {
    let respuesta;
    switch (accion) {
        case 'A': {     //ALTA
            respuesta = await fetch(`/${api}`, {
                method :'POST',
                headers: { 'Content-Type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        } 
        case 'D' : {    //ELIMINACION
            respuesta = await fetch(`/${api}/${id}`, {
                method : 'DELETE'
            });   
            break;         
        }
        case 'U': {     //ACTUALIZACION
            respuesta = await fetch(`/${api}/${id}`, {
                method : 'PUT',
                headers : { 'Content-type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        }
    }
    let salida = await respuesta.text();
    if (salida == 'ok')
        return true
    else {
        alert(salida);
        return false
    }    
}

async function armarReferencia(campo, api, id, codi, desc, valor) {
    let url = `./${api}`;
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

function getDoY(fecha, desde) {
    return Math.floor((fecha - desde) / 1000 / 60 / 60 / 24);
}

function getFechaDoY(desde, dias) {
    let msDesde = Date.parse(desde);
    let msFecha = msDesde + parseInt(dias * 1000 * 60 * 60 * 24);
    let fecha = new Date(msFecha).toISOString();
    return fecha;
}

export { aServidor, armarReferencia, getDoY, getFechaDoY }
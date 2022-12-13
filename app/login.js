document.querySelector("#btnIngresar").addEventListener("click", async () => {
    let usuario = document.querySelector('#usuario').value;
    let palabra = document.querySelector('#palabra').value;
    if (usuario && palabra) {
        let ingreso = {
            "usuario": usuario,
            "palabra": palabra
        };
        let respuesta = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ingreso),
        });
        let salida = await respuesta.text();
        if (salida == 'ok') {
            window.sessionStorage.setItem('loginOk', true);
            window.sessionStorage.setItem('ingreso', ingreso);
            window.location.href = './index.html';
        } else {
            alert(salida);
            window.sessionStorage.setItem('loginOk', false);
            window.sessionStorage.setItem('ingreso', '');
            window.location.href = './login.html';
        }
    }
    else 
        alert('Debe ingresar un usuario y una contraseña');
});

document.querySelector("#btnRegresar").addEventListener("click", () => {
    window.location='./index.html';
});


document.querySelector("#btnCiudades").addEventListener("click", () => {
    if (window.sessionStorage.getItem("loginOk")) window.location='./ciudades.html';
});
document.querySelector("#btnEscuelas").addEventListener("click", () => {
    if (window.sessionStorage.getItem("loginOk")) window.location='./escuelas.html';
});
document.querySelector("#btnProfesores").addEventListener("click", () => {
    if (window.sessionStorage.getItem("loginOk")) window.location='./profesores.html';
});
document.querySelector("#btnEstudiantes").addEventListener("click", () => {
    if (window.sessionStorage.getItem("loginOk")) window.location='./estudiantes.html';
});
document.querySelector("#btnClases").addEventListener("click", () => {
    if (window.sessionStorage.getItem("loginOk")) window.location='./clases.html';
});

document.querySelector("#btnSalir").addEventListener("click", () => {
    window.sessionStorage.setItem('loginOk', false);
    window.sessionStorage.setItem('ingreso', '');
    window.location.href = './login.html';
});

if (window.sessionStorage.getItem("loginOk")) {
    document.querySelector("#frmSalir").classList.toggle("oculto");
} else {
    window.location.href = "./login.html";
} 

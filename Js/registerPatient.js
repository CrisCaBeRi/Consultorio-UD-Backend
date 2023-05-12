const formPatient = document.getElementById("form-patient-register");

formPatient.addEventListener("submit", (event) => {
  event.preventDefault();
  const patientData = {
    patientName: document.getElementById("name").value,
    patientlastName: document.getElementById("lastName").value,
    patientId: document.getElementById("id").value,
    patientAge: document.getElementById("age").value,
    patientPhone: document.getElementById("phone").value,
    patientSpeciality: document.getElementById("speciality").value,
  };
  const patientCookie = getCookie("patients")
    ? JSON.parse(getCookie("patients"))
    : [];
  //?Validar si existe una propiedad con la misma especialidad
  const idExist = patientCookie.some(
    (pat) => pat.patientId === patientData.patientId
  );
  if (idExist) {
    alert(`Ya existe un usuario con el id ${patientData.patientId}`);
  } else {
    saveOnCookie(patientData); //?si no, guarda la cookie
  }
  const confirmation = confirm(
    "¿Desea ver la lista de registros o seguir añadiendo pacientes?"
  );
  if (confirmation) {
    window.location.href = "./listPatient.html";
  } else {
    formDoctor.reset();
  }
});
//! Guardar el objeto creado dentro de la cookie
function saveOnCookie(patData) {
  //recibe el objeto creado del formulario
  let patientData = getCookie("patients"); //trae la cookie
  if (patientData === "") {
    //si no hay cookie crea un array
    patientData = "[]";
  }
  const patients = JSON.parse(patientData); //elimina las comillas de un json

  patients.push(patData);
  const newJSON = JSON.stringify(patients);
  setCookie("patients", newJSON);
}
//! Función para guardar datos en la cookie
function setCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(value)}`;
}
//!Funcion para traer la cookie
function getCookie(nameCookie) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === nameCookie) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return "";
}

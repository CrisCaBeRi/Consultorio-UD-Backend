const formDoctor = document.getElementById("form-doctor-register");

formDoctor.addEventListener("submit", (event) => {
  event.preventDefault();
  const dataDoctor = {
    nameDoctor: document.getElementById("name").value,
    lastnameDoctor: document.getElementById("lastName").value,
    idDoctor: document.getElementById("id").value,
    officeDoctor: document.getElementById("office").value,
    mailDoctor: document.getElementById("mail").value,
    specialtyDoctor: document.getElementById("specialty").value,
  };
  //?Validar si existe una cookie llamada medicos, si no, retorna un array vacío
  const doctorCookie = getCookie("doctors")
    ? JSON.parse(getCookie("doctors"))
    : [];
  //?Validar si existe una propiedad con la misma especialidad
  const specialityExist = doctorCookie.some(
    (med) => med.specialtyDoctor === dataDoctor.specialtyDoctor
  );
  const idExist = doctorCookie.some(
    (med) => med.idDoctor === dataDoctor.idDoctor
  );
  if (specialityExist) {
    alert(
      `Ya existe un médico con la especialidad de ${dataDoctor.specialtyDoctor}`
    );
  } else if (idExist){
    alert(
      `Ya existe un registro con ese documento de identidad:  ${dataDoctor.idDoctor}`
    );
  }else {
    saveOnCookie(dataDoctor); //?si no, guarda la cookie
  }
  const confirmation = confirm(
    "¿Desea ver la lista de registros o seguir añadiendo medicos?"
  );
  if (confirmation) {
    window.location.href = "./listDoctor.html";
  } else {
    formDoctor.reset();
  }
});

//! Guardar el objeto creado dentro de la cookie
function saveOnCookie(docData) {
  //recibe el objeto creado del formulario
  let doctorData = getCookie("doctors"); //trae la cookie
  if (doctorData === "") {
    //si no hay cookie crea un array
    doctorData = "[]";
  }
  const doctors = JSON.parse(doctorData); //elimina las comillas de un json

  doctors.push(docData);
  const newJSON = JSON.stringify(doctors);
  setCookie("doctors", newJSON);
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

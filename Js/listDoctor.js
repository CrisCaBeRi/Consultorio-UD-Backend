const TABLE_PATIENTS = document.getElementById("list-patient");
const TABLE_BODY = TABLE_PATIENTS.querySelector("tbody");
const DOCTORS_COOKIE = JSON.parse(getCookie("doctors"));
const PATIENTS_COOKIE = JSON.parse(getCookie("patients") || "[]");

for (let i = 0; i < DOCTORS_COOKIE.length; i++) {
  const DOCTOR = DOCTORS_COOKIE[i];
  let row = TABLE_BODY.insertRow();
  let celLastNameDoctor = row.insertCell();
  celLastNameDoctor.textContent = DOCTOR.lastNameDoctor;
  let celNameDoctor = row.insertCell();
  celNameDoctor.textContent = DOCTOR.nameDoctor;
  let celIdDoctor = row.insertCell();
  celIdDoctor.textContent = DOCTOR.idDoctor;
  let celEmailDoctor = row.insertCell();
  celEmailDoctor.textContent = DOCTOR.mailDoctor;
  let celOfficeDoctor = row.insertCell();
  celOfficeDoctor.textContent = DOCTOR.officeDoctor;
  let celSpecialityDoctor = row.insertCell();
  celSpecialityDoctor.textContent = DOCTOR.specialityDoctor;
  let celPatientsAsigned = row.insertCell();
  let findedPatients = PATIENTS_COOKIE.filter(
    (patient) => DOCTOR.specialityDoctor === patient.patientSpeciality
  );
  console.log(findedPatients);
  if (findedPatients.length > 0) {
    celPatientsAsigned.innerHTML = `<ul id="patients"></ul>`;
    const CEL_PATIENTS = celPatientsAsigned.querySelector("#patients");
    for (let i = 0; i < findedPatients.length; i++) {
      const PATIENT_FINDED = findedPatients[i];
      CEL_PATIENTS.innerHTML += `<li>${PATIENT_FINDED.patientlastName} ${PATIENT_FINDED.patientName}</li>`;
    }
  } else {
    celPatientsAsigned.textContent = "Sin pacientes";
  }
}
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

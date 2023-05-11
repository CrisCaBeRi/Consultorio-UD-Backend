const tablePatients = document.getElementById("list-patient"); 
const tableBody = tablePatients.querySelector("tbody"); 

const patientCookie = JSON.parse(getCookie("patients")); 
const doctorsCookie = JSON.parse(getCookie("doctors")); 



for (let i = 0; i < patientCookie.length; i++) {
    const patient = patientCookie[i];
    /* console.log(patient) */
    let row = tableBody.insertRow();

    let lNameCell = row.insertCell(); 
    lNameCell.textContent = patient.patientlastName;
    let nameCell = row.insertCell(); 
    nameCell.textContent = patient.patientName;
    let idCell = row.insertCell();
    idCell.textContent = patient.patientId;
    let ageCell = row.insertCell(); 
    ageCell.textContent = patient.patientAge;

    let phoneCell = row.insertCell(); 
    phoneCell.textContent = patient.patientPhone; 

    let specialityCell = row.insertCell();
    specialityCell.textContent = patient.patientSpeciality
    
    const docAsigned = doctorsCookie.find(medico => medico.specialtyDoctor === patient.patientSpeciality); 
    
    let asignedDocCell = row.insertCell();
    asignedDocCell.textContent= docAsigned ? `${docAsigned.lastnameDoctor} ${docAsigned.nameDoctor}` : "por asignar"    
   
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

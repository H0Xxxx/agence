
const form = document.getElementById("bookingForm");
const message = document.getElementById("message");

const modal = document.getElementById("confirmModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx4XJMWb0sH6kzHVEidYtsZDOW-pMLOeL_1S2KIYapwCABu2gIoEafpC-coXLgxHqCa/exec";

let pendingData = null;


// submit form → open modal
form.addEventListener("submit", (e) => {
e.preventDefault();

pendingData = {
name: document.getElementById("name").value,
phone: document.getElementById("phone").value,
service: document.getElementById("service").value,
date: document.getElementById("date").value,
time: document.getElementById("time").value
};

modal.style.display = "flex";

});


// cancel
noBtn.onclick = () => {
modal.style.display = "none";
};


// confirm → send to Google Sheet
yesBtn.onclick = async () => {

modal.style.display = "none";
message.innerText = "⏳ Envoi...";

try {

const res = await fetch(GOOGLE_SCRIPT_URL, {
method: "POST",
body: JSON.stringify(pendingData),
mode: "no-cors"
});

message.innerText = "✅ Réservation envoyée !";
form.reset();

} catch (error) {

console.log(error);
message.innerText = "❌ Erreur réseau";

}

};
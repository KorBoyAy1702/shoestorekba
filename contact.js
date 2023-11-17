// Import Firebase and configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import firebaseConfig from './config.js';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const contactCollection = collection(db, 'contact');

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact').addEventListener('submit', submitForm);
});

async function submitForm(e) {
    e.preventDefault();

    const name = getElementById('naam');
    const email = getElementById('email');
    const message = getElementById('bericht');

    console.log(name, email, message);

    await saveMessage(name, email, message);

    document.querySelector(".sending").style.display = "block";
}


const saveMessage = async (naam, email, message) => {
    try {
        await addDoc(contactCollection, {
            naam: naam,
            email: email,
            message: message,
        });
        console.log("Message saved successfully");
    } catch (error) {
        console.error("Error saving message:", error);
    }
};


const getElementById = (id) => {
    return document.getElementById(id).value;
};



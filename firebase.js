// Import Firebase and configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import firebaseConfig from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Firestore
const firestore = getFirestore(app);

// Fetch and render specific shoes from Firestore
async function renderTopMostBoughtShoes() {
    const shoeList = document.getElementById('shoes');

    // Query the Firestore collection 'shoes' and order by 'gekocht' in descending order
    const querySnapshot = await getDocs(query(collection(firestore, 'shoes'), orderBy('gekocht', 'desc')));

    // Loop through the first 4 documents in the query (top 4 most bought shoes)
    for (let i = 0; i < Math.min(querySnapshot.docs.length, 4); i++) {
        const shoeData = querySnapshot.docs[i].data();
        if (shoeData.foto) {
            const imageUrl = shoeData.foto;
            const shoeIndex = shoeData.schoennummer; // Use the loop variable as the custom index
            console.log(shoeIndex);
            renderShoe(shoeData, imageUrl, shoeList, shoeIndex);
        }
    }
}

// Render an individual shoe
function renderShoe(shoeData, imageUrl, shoeList, shoeIndex) {
    const div = document.createElement('div');
    div.classList.add('shoes1');
    div.innerHTML = `
    <div class="shoes display-flex align-items justify-content">
        <div>
            <h3 class="fs-h3">${shoeData.merk}</h3>
            <h4 class="fs-1rem max-w-20rem">${shoeData.prijs}</h4>
            <a class="button-home no-text-decoration" href="./detail_shoe/schoen${shoeIndex}/">Detail</a>
        </div>
        <div>
            <figure class="margin-top-2rem">
                <img class="img-responsive " src="${imageUrl}" alt="Shoe Image">
            </figure>
        </div>
    </div>
    `;
    shoeList.appendChild(div);
}

// Call the function to render specific shoes when the page loads
window.onload = renderTopMostBoughtShoes;

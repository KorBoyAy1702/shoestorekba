// Import Firebase and configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import firebaseConfig from '../config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Firestore
const firestore = getFirestore(app);

// An array of specific shoe IDs you want to display
const specificShoeIds = [
    "rSqUUfEzvHgymZiIk4i6",
    "uQczihzqgKazCCz6uS8r",
    "4awgUOgdIjgzXB0IkPJ3",
    "pJaaaiE2z5GuQQOM8p1f",
    "oALpaCJhrurjhi2i6lwH",
    "48COLJdsiN9baod5BNgV",
    "mRXEyRxnU3OJ2JtuiAEQ",
    "hmUJcdwGsWQiNAJoA9HJ",
    "BffeksXrcbUOvJjHOEoc",
    "3P49BgRy3BfcQRO0Hace",
    "WjkCXZhsZAxKDQZvsKaJ",
    "MbSbjfkKuRnUazo3B7zl"
];

async function renderSpecificShoes() {
    const uls = document.querySelectorAll("ul[id^='shoes']");

    let ulIndex = 0;
    let shoesInCurrentUl = 0;

    for (let i = 0; i < specificShoeIds.length; i++) {
        const shoeId = specificShoeIds[i];
        const docRef = doc(firestore, 'shoes', shoeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const shoeData = docSnap.data();
            if (shoeData.foto) {
                const imageUrl = shoeData.foto;
                const shoeNumber = shoeData.schoennummer;
                renderShoe(shoeData, imageUrl, uls[ulIndex], shoeNumber); // Pass the shoe index

                shoesInCurrentUl++;
                if (shoesInCurrentUl === 3) {
                    ulIndex++;
                    shoesInCurrentUl = 0;
                }
            }
        }
    }
}

// Render an individual shoe
function renderShoe(shoeData, imageUrl, ul, shoeIndex) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="shoes display-flex align-items justify-content">
            <div>
                <h3 class="fs-h3">${shoeData.merk}</h3>
                <h4 class="fs-1rem max-w-20rem">${shoeData.prijs}</h4>
                <a class="button-home no-text-decoration" href="../detail_shoe/schoen${shoeIndex}/">Detail</a>
            </div>
            <div>
                <figure class="margin-top-2rem">
                    <img class="img-responsive" src="${imageUrl}" alt="Shoe Image">
                </figure>
            </div>
        </div>
    `;
    ul.appendChild(li);
}

// Call the function to render specific shoes when the page loads
window.onload = renderSpecificShoes;

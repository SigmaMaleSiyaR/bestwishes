import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getFirestore, doc, getDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjYmnpbgMsCtI6U2XFTa38W1z1Fl6JjgA",
  authDomain: "test-38633.firebaseapp.com",
  projectId: "test-38633",
  storageBucket: "test-38633.firebasestorage.app",
  messagingSenderId: "608517924141",
  appId: "1:608517924141:web:7a0a3b1183e2c079eb1fa4",
  measurementId: "G-8LE1ZWZYK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Get name from Firestore by document ID
async function getNameById(documentId) {
  const nameRef = doc(db, 'sender', documentId); // Use 'sender' collection and the document ID
  const docSnap = await getDoc(nameRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const name = data.name;
    console.log('Name:', name);
    document.getElementById('senderName').textContent = `Name: ${name}`;
  } else {
    console.log('No such document!');
    document.getElementById('senderName').textContent = 'close friend!';
  }
}

// Extract document ID from URL
function getDocumentIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Handle form submission
document.getElementById('customNameForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the form from submitting the default way
  const customName = document.getElementById('customName').value;

  try {
    // Add the name to the 'sender' collection
    const docRef = await addDoc(collection(db, "sender"), {
      name: customName
    });
    console.log(`Document written with ID: ${docRef.id}`);
    const customWish = `Happy New Year 2025, ${customName}! 🎉`;
    document.getElementById('customWish').textContent = customWish;
    document.getElementById('customNameForm').reset();

    // Generate the link with the document ID
    const link = `${window.location.origin}${window.location.pathname}?id=${docRef.id}`;
    document.getElementById('customWish').innerHTML += `<br><a href="${link}" class="btn btn-secondary mt-2">Visit link</a>`;

    // Add share button
    if (navigator.share) {
      const shareButton = document.createElement('button');
      shareButton.textContent = 'Share this link';
      shareButton.className = 'btn btn-primary mt-2'; // Use btn-primary for sharing button
      shareButton.addEventListener('click', () => {
        navigator.share({
          title: 'Happy New Year 2025!',
          text: customWish,
          url: link
        }).catch(console.error);
      });
      document.getElementById('customWish').appendChild(shareButton);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    document.getElementById('customWish').textContent = `Failed to submit name: ${e.message}`;
  }
});

// Get the document ID from the URL
const documentId = getDocumentIdFromURL();
if (documentId) {
  getNameById(documentId);
} else {
  console.log('No document ID found in URL');
}

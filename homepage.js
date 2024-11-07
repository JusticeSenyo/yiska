import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCsnqkFtoK0AKcE7MSq7QZHkWnN1VEiwVY",
  authDomain: "login-form-dd0ff.firebaseapp.com",
  projectId: "login-form-dd0ff",
  storageBucket: "login-form-dd0ff.firebasestorage.app",
  messagingSenderId: "1051486048416",
  appId: "1:1051486048416:web:c09c72601650a3ca72b9c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("loggedUserUsername").innerText = userData.username;
          document.getElementById("loggedUserEmail").innerText = userData.email;
        } else {
          console.log("no document found matching id")
        }
      })
      .catch((error) => {
        console.log("Error getting document");
      });
  }
  else {
    console.log("user id not found in local storage")
  }
})

const logOutButton = document.getElementById("logout");

logOutButton.addEventListener("click", () => {
localStorage.removeItem('loggedInUserId');
signOut(auth)
.then(() => {
  window.location.href = "account.html";
})
.catch((error) => {
  console.error("Error signing out",error);
})
});
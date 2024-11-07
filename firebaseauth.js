// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

// Your web app's Firebase configuration
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

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;

  }, 5000)

}
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById("remail").value;
  const password = document.getElementById("rpassword").value;
  const username = document.getElementById("rusername").value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    const userData = {
      email: email,
      username: username,
    };
    showMessage('account created succesfully', 'signUpMessage');
    const docref = doc(db, "users", user.uid);
    setDoc(docref, userData)
      .then(() => {
        window.location.href = "account.html"
      })
      .catch((error) => {
        console.errror('error writing document', error);
      });
  })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email already in use !!!!!!!!!!!!!!', 'signUpMessage');
      }
      else {
        showMessage('Error creating account ', 'signUpMessage');
      }
    })
});

const signIn = document.getElementById("submitSignIn");
signIn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('login succesful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = "homepage.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showMessage('Incorrect email or password', 'signInMessage');
      }
      else {
        showMessage('account does not esixt', 'signInMessage');
      }
    })
})

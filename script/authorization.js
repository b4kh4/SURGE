// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { displayModalWindow } from "../script/displayModalWindow.js"

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCNJL3hUP0RLLRfHc4GK96k8M6y8z-jP-Q",
    authDomain: "surge-xyz.firebaseapp.com",
    projectId: "surge-xyz",
    storageBucket: "surge-xyz.firebasestorage.app",
    messagingSenderId: "880129710166",
    appId: "1:880129710166:web:51b5a714f6de65078683f7"
};

// Инициализация
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 📌 Регистрация
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const username = document.getElementById("registerUsername").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            friends: []
        });

        displayModalWindow(document.getElementById("modal-overlay"), true);
        registerForm.reset();

        console.log(userCredential.user.uid)
        localStorage.clear();
        localStorage.setItem("uid", userCredential.user.uid);
    } catch (error) {
        console.error("Ошибка при регистрации или записи в Firestore:", error); // <---
        document.getElementById("registerError").textContent = error.message;
    }
});

// 📌 Вход
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        displayModalWindow(document.getElementById("modal-overlay"), true);
        loginForm.reset();

        console.log(userCredential.user.uid)
        localStorage.clear();
        localStorage.setItem("uid", userCredential.user.uid);
    } catch (error) {
        document.getElementById("loginError").textContent = error.message;
    }
});


// Переключение  между регистрацией и входом
const registerBox = document.getElementById("register-box");
const loginBox = document.getElementById("login-box");

const openLoginBtn = document.getElementById("open-login");
const openRegisterBtn = document.getElementById("open-register");

openLoginBtn.addEventListener("click", function () {
    registerBox.style.display = 'none';
    loginBox.style.display = 'flex';
})

openRegisterBtn.addEventListener("click", function () {
    loginBox.style.display = 'none';
    registerBox.style.display = 'flex';
})

const modalBtn = document.getElementById('ok-btn');
modalBtn.addEventListener("click", function () {
    displayModalWindow(document.getElementById("modal-overlay"), false);
    window.open("index.html", "_self")
})
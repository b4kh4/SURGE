import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

async function getUsernameByUID(uid) {
    console.log(uid)
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        const data = docSnap.data();
        return data.username;
        } else {
        console.log("Пользователь с таким UID не найден!");
        return null;
        }
    } catch (error) {
        console.error("Ошибка при получении имени пользователя:", error);
        return null;
    }
}

async function showUsername() {
    const uid = localStorage.getItem("uid");
    if (!uid) {
        console.log("UID нет в localStorage");
        return;
    }

    var warning = document.getElementById("warning");
    warning.style.display = 'none';

    const username = await getUsernameByUID(uid);
    if (username) {
        document.getElementById('username').innerHTML = username;
    } else {
        document.getElementById('username').innerHTML = "Имя не найдено";
    }
}
showUsername();

const closeBtn = document.getElementById("close-window");
closeBtn.addEventListener("click", function () {
    displayModalWindow(document.getElementById("back-overlay"), false)
})

const profile = document.getElementsByClassName("profile")[0];
profile.addEventListener("click", function () {
    displayModalWindow(document.getElementById("back-overlay"), true)
})
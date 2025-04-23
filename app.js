// Firebase references
const auth = firebase.auth();
const db = firebase.firestore();

// DOM elements
const loginBox = document.getElementById("login-box");
const notesBox = document.getElementById("notes-box");
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");

// Signup function
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("ثبت‌نام موفق"))
    .catch(error => alert(error.message));
}

// Login function
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .catch(error => alert(error.message));
}

// Logout function
function logout() {
  auth.signOut();
}

// Listen to auth state
auth.onAuthStateChanged(user => {
  if (user) {
    loginBox.style.display = "none";
    notesBox.style.display = "block";
    loadNotes(user.uid);
  } else {
    loginBox.style.display = "block";
    notesBox.style.display = "none";
    notesList.innerHTML = "";
  }
});

// Add note
function addNote() {
  const text = noteInput.value;
  const user = auth.currentUser;

  if (text.trim() === "") return;

  db.collection("notes").add({
    uid: user.uid,
    text: text,
    created: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    noteInput.value = "";
    loadNotes(user.uid);
  });
}

// Load notes
function loadNotes(uid) {
  db.collection("notes")
    .where("uid", "==", uid)
    .orderBy("created", "desc")
    .get()
    .then(snapshot => {
      notesList.innerHTML = "";
      snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().text;
        notesList.appendChild(li);
      });
    });
}

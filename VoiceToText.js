const startButton = document.getElementById('start-button');
const noteInput = document.getElementById('note-input');
const saveButton = document.getElementById('save-note');
const notesList = document.getElementById('notes-list');
const languageSelector = document.getElementById('language-selector');
let editingIndex = null;  // To store index of the note being edited

// Check if Speech Recognition is supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

// Set initial language
recognition.lang = 'en-US';
recognition.continuous = false;
recognition.immediateResults = false;

// Change language based on user selection
languageSelector.addEventListener('change', () => {
    recognition.lang = languageSelector.value;  // Set the language based on dropdown
    console.log(`Speech recognition language set to: ${recognition.lang}`);
});

// Start voice recognition
startButton.addEventListener('click', () => {
    recognition.start();
    noteInput.placeholder = '.;.Lollita is Listening.;.';
});

// Capture speech and convert to text
recognition.onresult = function(event) {
    const speechResult = event.results[0][0].transcript;
    noteInput.value = speechResult;
    noteInput.placeholder = '.;.LOLLITA NOTES.;.';
};

recognition.onerror = function(event) {
    noteInput.placeholder = 'Lollita base Error. You can try again!';
};

// Save the note to localStorage
saveButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        if (editingIndex !== null) {
            // If editing an existing note, update it
            savedNotes[editingIndex] = noteText;
            editingIndex = null;  // Reset editing index after saving
        } else {
            // If adding a new note, push to the array
            savedNotes.push(noteText);
        }
        localStorage.setItem('notes', JSON.stringify(savedNotes));
        renderSavedNotes();
        noteInput.value = ''; // Clear input after saving
    }
});

// Render saved notes from localStorage
function renderSavedNotes() {
    let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = ''; // Clear existing list
    savedNotes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${note}</span>
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesList.appendChild(li);
    });
}

// Delete a note from localStorage
function deleteNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(savedNotes));
    renderSavedNotes();
}

// Set the input field for editing a note
function editNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    noteInput.value = savedNotes[index];  // Set the note text into the input field
    editingIndex = index;  // Set the index of the note being edited
    noteInput.placeholder = '.;.Edit your note here.;.';
}

// Initial render of saved notes
renderSavedNotes();


///Lightsss/////

function toggleClassPlayer(){

    const body = document.querySelector('body');
    body.classList.toggle('lightPlayer');
    
    }

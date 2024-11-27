const startButton = document.getElementById('start-button');
const noteInput = document.getElementById('note-input');
const saveButton = document.getElementById('save-note');
const notesList = document.getElementById('notes-list');
let editingIndex = null;  // To store index of the note being edited

// Check if Speech Recognition is supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.continuous = false;
recognimmediateResults = false;

// Start voice recognition
startButton.addEventListener('click', () => {
    recognition.start();
    noteInput.placeholder = 'Listening...';
});

// Capture speech and convert to text
recognition.onresult = function(event) {
    const speechResult = event.results[0][0].transcript;
    noteInput.value = speechResult;
    noteInput.placeholder = 'Your note will appear here...';
};

recognition.onerror = function(event) {
    noteInput.placeholder = 'Error occurred. Please try again.';
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
    noteInput.placeholder = 'Edit your note here...';
}

// Initial render of saved notes
renderSavedNotes();

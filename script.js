(() => {
  "use strict";

  const STORAGE_KEY = "quicknotes-notes";
  const MAX_NOTE_LENGTH = 200;

  const noteForm = document.querySelector("#note-form");
  const noteInput = document.querySelector("#note-input");
  const noteCategory = document.querySelector("#note-category");
  const searchInput = document.querySelector("#search-input");
  const notesList = document.querySelector("#notes-list");
  const noteCount = document.querySelector("#note-count");
  const errorMessage = document.querySelector("#error-message");

  let notes = loadNotes();

  function loadNotes() {
    try {
      const savedNotes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(savedNotes)) return [];
      return savedNotes.filter((note) =>
        note &&
        (typeof note.id === "string" || typeof note.id === "number") &&
        typeof note.text === "string" &&
        ["Personal", "Work", "Study"].includes(note.category) &&
        typeof note.createdAt === "string"
      );
    } catch (error) {
      console.warn("QuickNotes could not load saved notes.", error);
      return [];
    }
  }

  function saveNotes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error("QuickNotes could not save notes.", error);
      errorMessage.textContent = "Your notes could not be saved in this browser.";
    }
  }

  function categoryClass(category) {
    return `category-${category.toLowerCase()}`;
  }

  function updateCount() {
    if (notes.length === 0) {
      noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
      noteCount.textContent = "You have 1 note.";
    } else {
      noteCount.textContent = `You have ${notes.length} notes.`;
    }
  }

  function makeNoteCard(note) {
    const item = document.createElement("li");
    item.classList.add("note-card", categoryClass(note.category));

    const content = document.createElement("div");
    content.className = "note-content";

    const text = document.createElement("p");
    text.className = "note-text";
    // Use textContent so note text is always treated as text, never HTML.
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const category = document.createElement("span");
    category.className = "category-label";
    category.textContent = note.category;

    const date = document.createElement("time");
    date.textContent = note.createdAt;
    date.dateTime = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete note: ${note.text.slice(0, 60)}`);
    deleteButton.addEventListener("click", () => {
      notes = notes.filter((savedNote) => savedNote.id !== note.id);
      saveNotes();
      render();
    });

    meta.append(category, date);
    content.append(text, meta);
    item.append(content, deleteButton);
    return item;
  }

  function render() {
    const searchTerm = searchInput.value.trim().toLocaleLowerCase();
    const visibleNotes = notes.filter((note) =>
      note.text.toLocaleLowerCase().includes(searchTerm)
    );

    notesList.replaceChildren();
    updateCount();

    if (visibleNotes.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "empty-state";
      emptyItem.textContent = searchTerm
        ? "No notes match your search."
        : "No notes yet. Add your first thought above.";
      notesList.appendChild(emptyItem);
      return;
    }

    visibleNotes.forEach((note) => {
      notesList.appendChild(makeNoteCard(note));
    });
  }

  noteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = noteInput.value.trim();

    if (!text) {
      errorMessage.textContent = "Please type a note first.";
      noteInput.focus();
      return;
    }

    if (text.length > MAX_NOTE_LENGTH) {
      errorMessage.textContent = "Notes must be 200 characters or fewer.";
      noteInput.focus();
      return;
    }

    const note = {
      id: (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function")
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      category: noteCategory.value,
      createdAt: new Date().toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
      })
    };

    notes.unshift(note);
    errorMessage.textContent = "";
    noteInput.value = "";
    saveNotes();
    render();
    noteInput.focus();
  });

  searchInput.addEventListener("input", render);

  render();
})();

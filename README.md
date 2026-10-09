# QuickNotes

QuickNotes is a lightweight, responsive note-taking web app for organising quick thoughts into Personal, Work, and Study categories. Add notes, search by text, remove individual notes, and keep your notes saved in the browser between visits. It is built with plain HTML, CSS, and JavaScript, so there are no dependencies or build tools to install.

## Features

- Add notes with a Personal, Work, or Study category.
- Validate entries: notes cannot be blank and must be 200 characters or fewer.
- View each note with its category label and creation date/time.
- Delete individual notes.
- Search note text as you type, without case sensitivity.
- Persist notes using the browser's localStorage.
- Display an accurate note count for zero, one, or multiple notes.
- Responsive layout, including a vertically stacked form on smaller screens.
- Render note content safely with DOM methods and `textContent`.

## How to run locally

1. Download or clone this repository:
   `git clone https://github.com/dthanji/quicknotes-app.git`
2. Open the `quicknotes-app` folder.
3. Open `index.html` in a modern web browser.

No server, package manager, or build step is required. Notes are saved in localStorage for the browser and origin in which you open the app.

## What I learned

- How semantic HTML forms, labels, and accessible status messages make a small app easier to use.
- How CSS Flexbox, reusable category classes, and media queries support a responsive interface.
- How to manage an array of note objects and re-render a list using `createElement` and `textContent`.
- How JSON and localStorage preserve client-side data between page refreshes.
- How to validate input, implement searching and deletion, and organise incremental changes into meaningful Git commits.

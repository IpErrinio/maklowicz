const categories = JSON.parse(localStorage.getItem("categories")) || [];

function renderCategories() {
  const categoriesDiv = document.getElementById("categories");
  categoriesDiv.innerHTML = "";

  categories.forEach((category, index) => {
    if (
      category &&
      typeof category.name === "string" &&
      Array.isArray(category.notes)
    ) {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");

      categoryDiv.innerHTML = `
                <h2>
                    <span id="categoryName${index}">${category.name}</span>
                    <input type="text" id="categoryInput${index}" style="display:none; margin: auto; text-align: center;" value="${category.name}">
                    <button onclick="toggleEditCategory(${index})">Edytuj</button>
                    <button id="deleteButton${index}" onclick="deleteCategory(${index})">Usuń kategorię</button>
                </h2>
                <input type="text" placeholder="Dodaj notatkę" id="noteInput${index}">
                <button onclick="addNote(${index})">Dodaj notatkę</button>
                <div id="notes${index}"></div>
            `;

      category.notes.forEach((note, noteIndex) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerHTML = `
                    <span id="noteName${index}-${noteIndex}">${note}</span>
                    <input type="text" id="noteInput${index}-${noteIndex}" style="display:none; margin: auto; text-align: center;" value="${note}">
                    <button onclick="toggleEditNote(${index}, ${noteIndex})">Edytuj</button>
                    <button id="deleteNoteButton${index}-${noteIndex}" onclick="deleteNote(${index}, ${noteIndex})">Usuń notatkę</button>
                `;
        categoryDiv.querySelector(`#notes${index}`).appendChild(noteDiv);
      });

      categoriesDiv.appendChild(categoryDiv);
    }
  });
}

function toggleEditCategory(index) {
  const categoryName = document.getElementById(`categoryName${index}`);
  const categoryInput = document.getElementById(`categoryInput${index}`);
  const editButton = categoryInput.nextElementSibling;
  const deleteButton = document.getElementById(`deleteButton${index}`);

  if (categoryInput.style.display === "none") {
    categoryInput.style.display = "block";
    categoryName.style.display = "none";
    editButton.textContent = "Zapisz";
    deleteButton.style.display = "none";
  } else {
    const newName = categoryInput.value.trim();

    if (newName === "") {
      alert("Nazwa kategorii nie może być pusta!");
      return;
    }

    const categoryExists = categories.some(
      (category, i) =>
        i !== index &&
        category &&
        category.name &&
        category.name.toLowerCase() === newName.toLowerCase()
    );

    if (categoryExists) {
      alert("Kategoria o tej nazwie już istnieje!");
      return;
    }

    categories[index].name = newName;
    localStorage.setItem("categories", JSON.stringify(categories));
    categoryInput.style.display = "none";
    categoryName.textContent = newName;
    categoryName.style.display = "block";
    editButton.textContent = "Edytuj";
    deleteButton.style.display = "inline";
  }
}

function toggleEditNote(categoryIndex, noteIndex) {
  const noteName = document.getElementById(
    `noteName${categoryIndex}-${noteIndex}`
  );
  const noteInput = document.getElementById(
    `noteInput${categoryIndex}-${noteIndex}`
  );
  const editButton = noteInput.nextElementSibling;
  const deleteButton = document.getElementById(
    `deleteNoteButton${categoryIndex}-${noteIndex}`
  );

  if (noteInput.style.display === "none") {
    noteInput.style.display = "block";
    noteName.style.display = "none";
    editButton.textContent = "Zapisz";
    deleteButton.style.display = "none";
  } else {
    const newNote = noteInput.value.trim();

    if (newNote === "") {
      alert("Notatka nie może być pusta!");
      return;
    }

    const noteExists = categories[categoryIndex].notes.some(
      (note, i) =>
        i !== noteIndex && note.toLowerCase() === newNote.toLowerCase()
    );

    if (noteExists) {
      alert("Notatka o tej nazwie już istnieje w tej kategorii!");
      return;
    }

    categories[categoryIndex].notes[noteIndex] = newNote;
    localStorage.setItem("categories", JSON.stringify(categories));
    noteInput.style.display = "none";
    noteName.textContent = newNote;
    noteName.style.display = "block";
    editButton.textContent = "Edytuj";
    deleteButton.style.display = "inline";
  }
}

function addCategory() {
  const categoryInput = document.getElementById("categoryInput");
  const newName = categoryInput.value.trim();

  if (newName === "") {
    alert("Nazwa kategorii nie może być pusta!");
    return;
  }

  const categoryExists = categories.some(
    (category) =>
      category &&
      typeof category === "object" &&
      category.name &&
      category.name.toLowerCase() === newName.toLowerCase()
  );

  if (categoryExists) {
    alert("Kategoria o tej nazwie już istnieje!");
    return;
  }

  const newCategory = {
    name: newName,
    notes: [],
  };
  categories.push(newCategory);
  localStorage.setItem("categories", JSON.stringify(categories));
  categoryInput.value = "";
  renderCategories();
}

function deleteCategory(index) {
  categories.splice(index, 1);
  localStorage.setItem("categories", JSON.stringify(categories));
  renderCategories();
}

function addNote(categoryIndex) {
  const noteInput = document.getElementById(`noteInput${categoryIndex}`);
  const newNote = noteInput.value.trim();

  if (newNote === "") {
    alert("Notatka nie może być pusta!");
    return;
  }

  const noteExists = categories[categoryIndex].notes.some(
    (note) => note.toLowerCase() === newNote.toLowerCase()
  );
  if (noteExists) {
    alert("Notatka o tej nazwie już istnieje w tej kategorii!");
    return;
  }

  categories[categoryIndex].notes.push(newNote);
  localStorage.setItem("categories", JSON.stringify(categories));
  noteInput.value = "";
  renderCategories();
}

function deleteNote(categoryIndex, noteIndex) {
  categories[categoryIndex].notes.splice(noteIndex, 1);
  localStorage.setItem("categories", JSON.stringify(categories));
  renderCategories();
}

renderCategories();

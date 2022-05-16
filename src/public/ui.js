// El ui o el archivo ui, lo que va hacer es contener funciones que van a interactuar con la interfaz de usuario, como cuando un usuario da un click en enviar el formulario, eso no es código que este relacionado con sockets, sino que esta relacionado con la lógica de la interfaz, entonces así como tengo un archivo para tan solo las conexiónes de websockets, este archivo solo va a ser el encargado de manipular la interfaz.

import { deleteNote, getNoteById, saveNote, updateNote } from "./sockets.js";

const notesList = document.querySelector("#notes");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

let savedId = ""; // esta variable me va a servir para al momento de darle al button send, poder actualizar si es que la nota ya tiene un id, y crear si es que la nota no tiene un id

const noteUI = (note) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="card card-body rounded-4 shadow-lg animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between align-items-center">
          <p class="title-card h3">${note.title}</p>
          <div>
              <button class="btn btn-danger delete" data-id="${note._id}">eliminar</button>
              <button class="btn btn-primary update" data-id="${note._id}">actualizar</button>
          </div>
      </div>
      <p>${note.description}</p>
  </div>
`;
    const btnDelete = div.querySelector(".delete"); // esa clase update que le agrego me va a permitir identificar el btn que quiero eliminar yendo luego a ver cual es su data-id, ya que si no le pusiera una clase, al momento de seleccionar un botón, se seleccionarían todos
    const btnUpdate = div.querySelector(".update"); // lo mismo, esa clase me va a servir para identificar el button

    btnDelete.addEventListener("click", () => deleteNote(btnDelete.dataset.id));
    btnUpdate.addEventListener("click", () =>
        getNoteById(btnDelete.dataset.id)
    );

    return div;
};

export const renderNotes = (notes) => {
    savedId = ""; // para saber si quiere actualizar o crear una nota
    notesList.innerHTML = ""; // este reset es porque si bien la primera vez al momento de hacer un forEach de las notas y pintarlas en el frontend va funcionar bien, sin embargo, al momento de eliminar una nota, el backend va a eliminarlo y devolver todas las notas que se encuentran ahora, por ende, si no limpiamos todo el notesList, estas se van a concatenar en la UI, haciendo ver que estan duplicadas
    notes.forEach((note) => notesList.append(noteUI(note))); // básicamente es lo que hacen algunos frameworks de Frontend como React, Angular o Vue por ejemplo, solo que lo simplifican mucho con sintaxys JSX o demas.
};

export const appendNote = (note) => {
    notesList.append(noteUI(note));
};

export const fillForm = (note) => {
    title.value = note.title;
    description.value = note.description;

    savedId = note._id;
};

export const onHandleSubmit = (e) => {
    e.preventDefault();
    if (savedId) {
        updateNote(savedId, title.value, description.value);
    } else {
        saveNote(title.value, description.value);
    }

    title.value = "";
    description.value = "";
};

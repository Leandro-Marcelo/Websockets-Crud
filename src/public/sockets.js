// Este archivo sockets.js, que es el socket del cliente, va a contener todas las funciones que me van a permitir interactuar con el backend, entonces yo aquí voy a tener funciones para cargar datos, para guardar datos, para leer, para eliminar y básicamente, todo lo que interactue con el backend a través de sockets.

const socket = io.connect(); // este io al final me devuelve un objeto el cual lo voy a llamar socket, este socket es la forma que yo puedo decirle al servidor que quiero que haga algo, es decir, con este socket yo puedo emitir eventos desde el cliente hacía el servidor

/**
 * create a new note
 * @param {string} title a title for a new note
 * @param {string} description a description for a new note
 */
export const saveNote = (title, description) => {
    let noteTitle = title || "sin titulo";
    let noteDescription = description || "sin descripción";
    socket.emit("client:newnote", {
        title: noteTitle,
        description: noteDescription,
    });
};

/**
 * delete a note based on an Id
 * @param {string} id a note ID
 */
export const deleteNote = (id) => {
    socket.emit("client:deletenote", id);
};

/**
 *
 * @param {string} id note ID
 * @param {string} title note title
 * @param {string} description note description
 */
export const updateNote = (_id, title, description) => {
    let noteTitle = title || "sin titulo";
    let noteDescription = description || "sin descripción";
    socket.emit("client:updatenote", {
        _id,
        title: noteTitle,
        description: noteDescription,
    });
};

/**
 * Load an Array of Notes
 * @param {function} callback A function to render Notes
 */
export const loadNotes = (callback) => {
    socket.on("server:loadnotes", callback); // =>  esto se leería como: escucha el evento que viene del servidor llamado loadnotes
    /* El callback miralo como estaba antes: antes era socket.on("loadnotes", (data) => {
      haciamos algo con la data
    }), como pusimos un callback, tenes que verlo como (data) => {la función que queres ejecutar PERO tienes acceso a la data} que en este caso la función callback es el de renderNotes */
};

export const onNewNote = (callback) => {
    socket.on("server:newnote", callback);
};

export const onSelected = (callback) => {
    socket.on("server:selectednote", callback);
};

export const getNoteById = (noteId) => {
    socket.emit("client:getnote", noteId);
};
